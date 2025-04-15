import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import NovoCartao from "@/app/(private)/kanban/modal/novo-cartao";

export default function KanbanBoard() {
  const [showModal, setShowModal] = useState(false);
  const [targetColumn, setTargetColumn] = useState(null);

  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const initialColumns = {
    "em-aberto": { title: "Em Aberto", items: ["1", "2"] },
    "em-andamento": { title: "Em Andamento", items: ["3"] },
    concluido: { title: "Concluído", items: ["4"] },
  };

  const itemsData = {
    1: {
      id: "1",
      title: "Aterro",
      equipe: "05",
      dias: "27/03 - 29/04",
      valor: "R$ 6.000,00",
    },
    2: {
      id: "2",
      title: "Escreva o serviço",
      equipe: "Equipe A",
      dias: "27/01 - 29/01",
      valor: "R$ 6.000,00",
    },
    3: {
      id: "3",
      title: "Serviço em andamento",
      equipe: "Equipe B",
      dias: "27/01 - 29/01",
      valor: "R$ 6.000,00",
    },
    4: {
      id: "4",
      title: "Finalizado",
      equipe: "Equipe C",
      dias: "27/01 - 29/01",
      valor: "R$ 6.000,00",
    },
  };

  function SortableItem({ id }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const item = itemsData[id];

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-lg truncate">{item.title}</p>
          <div className="flex items-center gap-2">
            <div className="h-5 w-10 rounded-3xl bg-[#16F22C]"></div>
            <button>
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
          👷 {item.equipe} &nbsp; 📅 {item.dias} <br /> 💰 {item.valor}
        </div>
      </div>
    );
  }

  function DroppableColumn({ id, children }) {
    const { setNodeRef } = useDroppable({ id });
    return (
      <div ref={setNodeRef} className="flex flex-col gap-4 min-h-[100px]">
        {children}
      </div>
    );
  }

  const [columnsState, setColumnsState] = useState(initialColumns);
  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = ({ active, over }) => {
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

    if (!fromColumnId || !toColumnId) return;

    if (fromColumnId === toColumnId) {
      const items = columnsState[fromColumnId].items;
      const newItems = arrayMove(
        items,
        items.indexOf(activeId),
        items.indexOf(overId)
      );

      setColumnsState((prev) => ({
        ...prev,
        [fromColumnId]: { ...prev[fromColumnId], items: newItems },
      }));
    } else {
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
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
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
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        ))}
      </div>
    </DndContext>
  );
}
