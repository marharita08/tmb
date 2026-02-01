import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { TaskResponse } from "@/types/task.type";

import { TaskCard } from "./task-card";

type SortableTaskCardProps = {
  task: TaskResponse;
};

export const SortableTaskCard: React.FC<SortableTaskCardProps> = ({ task }) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      ...task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
};
