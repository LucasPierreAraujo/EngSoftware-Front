import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import NovoCartao from "@/app/(private)/obras/[id]/kanban/[slug]/modal/novo-cartao";
import { tarefasService } from "@/services/tarefasService";
import { etapasService } from "@/services/etapasService";

// Mapeamento dos status
const statusMapping = {
  1: "Pendente",
  2: "Em Andamento",
  3: "Concluída",
  4: "Arquivada",
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function KanbanBoard({ etapa_id }) {
  const [showModal, setShowModal] = useState(false);
  const [targetColumn, setTargetColumn] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataEditModalId, setDataEditModalId] = useState(null);
  const [columnsState, setColumnsState] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  useEffect(() => {
    carregarTarefas();
  }, [showModal]);

  const carregarTarefas = async () => {
    try {
      setLoading(true);
      const response = await etapasService.view(etapa_id);

      const tarefasDaEtapa = response.tarefas || [];

      const novasColunas = {};
      Object.keys(statusMapping).forEach((id) => {
        novasColunas[id] = { title: statusMapping[id], items: [] };
      });

      tarefasDaEtapa.forEach((tarefa) => {
        const statusId = tarefa.status_id?.toString() || "1";
        if (!novasColunas[statusId]) {
          novasColunas[statusId] = {
            title: statusMapping[statusId] || "Desconhecido",
            items: [],
          };
        }
        novasColunas[statusId].items.push(tarefa.id.toString());
      });

      setTarefas(tarefasDaEtapa);
      setColumnsState(novasColunas);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const onDragEnd = async ({ active, over }) => {
    setActiveId(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const fromColumnId = Object.keys(columnsState).find((col) =>
      columnsState[col].items.includes(activeId)
    );
    const toColumnId =
      Object.keys(columnsState).find((col) =>
        columnsState[col].items.includes(overId)
      ) || overId;

    if (!fromColumnId || !toColumnId || fromColumnId === toColumnId) return;

    const fromItems = [...columnsState[fromColumnId].items];
    const toItems = [...columnsState[toColumnId].items];

    fromItems.splice(fromItems.indexOf(activeId), 1);
    const overIndex = toItems.indexOf(overId);
    if (overIndex >= 0) {
      toItems.splice(overIndex, 0, activeId);
    } else {
      toItems.push(activeId);
    }

    setColumnsState((prev) => ({
      ...prev,
      [fromColumnId]: { ...prev[fromColumnId], items: fromItems },
      [toColumnId]: { ...prev[toColumnId], items: toItems },
    }));  

    console.log({
      activeId: activeId,
      columnId: toColumnId,
    })
    if (toColumnId == '2') {
      await tarefasService.iniciar(activeId);
    } else if(toColumnId == '3'){
      await tarefasService.concluir(activeId);
    } else {
      console.log("Tarefa movida para coluna:", statusMapping[toColumnId])
    }
  };

  function SortableItem({ id }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const tarefa = tarefas.find((t) => t.id.toString() === id);
    if (!tarefa) return null;

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.3 : 1,
      borderLeft: `5px solid ${tarefa.cor}`,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-grab"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-lg truncate">{tarefa.titulo}</p>
          <button
            onClick={() => {
              setShowModal(true);
              setDataEditModalId(tarefa);
            }}
          >
            <Image alt="edit" src="/icons/edit.png" width={24} height={24} />
          </button>
        </div>
        <div className="text-sm">
          <p className="py-1 text-sm text-gray-700 line-clamp-3 break-words overflow-hidden">{tarefa.descricao}</p>
          <div className="flex gap-2 items-center text-xs text-gray-600">
            <span>{formatDate(tarefa.created_at)}</span>
            {tarefa.data_fim && <span>{formatDate(tarefa.data_fim)}</span>}
          </div>
        </div>
      </div>
    );
  }

  function DroppableColumn({ id, children }) {
    const { setNodeRef } = useDroppable({ id });
    const columnTitle = statusMapping[id] || "Desconhecido";
    return (
      <div ref={setNodeRef} className="flex flex-col gap-4 min-h-[100px]">
        {children}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Image src="/gif/loading.png" alt="Loading" width={100} height={100} />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex gap-6 p-6 overflow-x-auto w-full items-start">
        {Object.entries(columnsState).map(([columnId, column]) => (
          <div
            key={columnId}
            className="bg-[#E2E8F0] rounded-lg p-6 shadow-lg flex-1 min-w-[250px] max-w-[400px]"
          >
            <h2 className="font-semibold text-xl text-[#2D3748] mb-3">
              {column.title} | {column.items.length.toString().padStart(2, "0")}
            </h2>
            <SortableContext
              items={column.items}
              strategy={rectSortingStrategy}
            >
              <DroppableColumn id={columnId}>
                {column.items.map((itemId) => (
                  <SortableItem key={itemId} id={itemId} />
                ))}
              </DroppableColumn>
            </SortableContext>

            <button
              className="mt-4 text-sm text-[#6C6994] hover:underline"
              onClick={() => {
                setTargetColumn(columnId);
                setShowModal(true);
              }}
            >
              + Novo Cartão
            </button>

            {showModal && (
              <NovoCartao
                columnId={targetColumn}
                data={dataEditModalId}
                etapa_id={etapa_id}
                onClose={() => setShowModal(false)}
                onSuccess={() => {
                  setShowModal(false);
                  carregarTarefas();
                }}
              />
            )}
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeId && (
          <div className="bg-white p-4 rounded-lg shadow-lg opacity-80">
            {tarefas.find((t) => t.id.toString() === activeId)?.titulo}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
