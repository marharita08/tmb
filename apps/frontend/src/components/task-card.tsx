import { SquarePenIcon, Trash2Icon } from "lucide-react";

import { useTaskDialogsStore } from "@/store/task-dialogs.store";
import type { TaskResponse } from "@/types/task.type";
import { cn } from "@/utils/cn";

import { Button } from "./ui/button";

type TaskCardProps = {
  task: TaskResponse;
  isOverlay?: boolean;
  isDragging?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isOverlay = false,
  isDragging = false,
}) => {
  const { openEditTaskDialog, openDeleteTaskDialog } = useTaskDialogsStore();

  const handleEdit = () => {
    openEditTaskDialog(task);
  };

  const handleDelete = () => {
    openDeleteTaskDialog(task);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-md px-4 py-2 flex flex-col gap-1 shadow-md border border-primary/10 hover:cursor-grab",
        isOverlay && "cursor-grabbing",
        isDragging && "opacity-0",
      )}
    >
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEdit}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <SquarePenIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Trash2Icon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
