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

export default function KanbanBoard({ etapa_id }) {
  const [showModal, setShowModal] = useState(false);
  const [targetColumn, setTargetColumn] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataEditModalId, setDataEditModalId] = useState(null);

  // Mapeamento dos IDs de status para nomes de colunas e títulos
  const statusMapping = {
    1: "Pendente",
    2: "Em Andamento",
    3: "Concluída",
    4: "Arquivada",
  };

  const initialColumns = {
    1: { title: statusMapping[1], items: [] },
    2: { title: statusMapping[2], items: [] },
    3: { title: statusMapping[3], items: [] },
  };

  useEffect(() => {
    carregarTarefas();
  }, [etapa_id]);

  const carregarTarefas = async () => {
    try {
      setLoading(true);
      const response = await tarefasService.list(etapa_id);
      console.log("Tarefas carregadas:", response);
      setTarefas(response);

      // Organizar tarefas por status_id numérico
      const novasColunas = { ...initialColumns };

      response.forEach((tarefa) => {
        const statusId = tarefa.status_id;
        // Verifica se o statusId existe no mapeamento, caso contrário, define como 1 (Pendente)
        if (statusMapping[statusId]) {
          novasColunas[statusId].items.push(tarefa.id.toString());
        } else {
          novasColunas[1].items.push(tarefa.id.toString()); // Default para Pendente
        }
      });

      console.log("Colunas organizadas:", novasColunas);
      setColumnsState(novasColunas);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const [columnsState, setColumnsState] = useState(initialColumns);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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
    // overId pode ser o id de um item ou o id de uma coluna
    const toColumnId =
      Object.keys(columnsState).find((col) =>
        columnsState[col].items.includes(overId)
      ) || overId;

    if (!fromColumnId || !toColumnId) return;
    if (fromColumnId === toColumnId) return;

    // Converte o ID da coluna de destino para número para enviar ao backend
    const targetStatusId = parseInt(toColumnId, 10);

    // if (isNaN(targetStatusId)) {
    //     console.error("ID de status inválido:", toColumnId);
    //     // Em caso de ID inválido, podemos simplesmente retornar ou mostrar um erro, não recarregar tudo
    //     return;
    // }

    // Salva o estado atual das colunas antes da atualização local
    const previousColumnsState = { ...columnsState };

    // Atualização otimista do estado local
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

    let response = await tarefasService.updateStatus(activeId, targetStatusId);
    console.log(response);

    if (targetStatusId == 2) {
      console.log("Andamento");
    }

    if (targetStatusId == 3) {
      console.log("Concluida");
    }

    // Se chegou aqui, a atualização no backend foi bem-sucedida. Não precisa fazer mais nada.
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
    console.log("Renderizando tarefa:", tarefa, "para id:", id);

    if (!tarefa) {
      console.log("Tarefa não encontrada para id:", id);
      return null;
    }

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
          <div className="flex items-center gap-2">
            <button
              className="cursor-pointer"
              onClick={() => {
                setShowModal(true);
                setDataEditModalId(tarefa);
              }}
            >
              <Image
                alt="edit"
                src={"/icons/edit.png"}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className="text-sm">
          <p className="py-1">{tarefa.descricao}</p>
          <div className="flex gap-2 items-center">
            <span>
              {new Date(tarefa.created_at).getDate() < 10
                ? "0" + new Date(tarefa.created_at).getDate()
                : new Date(tarefa.created_at).getDate()}
              /
              {new Date(tarefa.created_at).getMonth() < 10
                ? "0" + new Date(tarefa.created_at).getMonth()
                : new Date(tarefa.created_at).getMonth()}
              /{new Date(tarefa.created_at).getFullYear()}
            </span>

            {tarefa.data_fim != null && (
              <span>
                {new Date(tarefa.created_at).getDate() < 10
                  ? "0" + new Date(tarefa.created_at).getDate()
                  : new Date(tarefa.created_at).getDate()}
                /
                {new Date(tarefa.created_at).getMonth() < 10
                  ? "0" + new Date(tarefa.created_at).getMonth()
                  : new Date(tarefa.created_at).getMonth()}
                /{new Date(tarefa.created_at).getFullYear()}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  function DroppableColumn({ id, children }) {
    const { setNodeRef } = useDroppable({ id });
    // Use o statusMapping para obter o título da coluna
    const columnTitle = statusMapping[id] || "Status Desconhecido";

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
                columnId={targetColumn} // Passa o ID numérico da coluna
                data={dataEditModalId}
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
        {activeId ? (
          <div className="bg-white p-4 rounded-lg shadow-lg opacity-80">
            {tarefas.find((t) => t.id.toString() === activeId)?.titulo}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
