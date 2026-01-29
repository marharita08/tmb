import { SquarePenIcon, Trash2Icon } from "lucide-react";

import type { TaskResponse } from "@/types/task.type";

import { Button } from "./ui/button";

type TaskCardProps = {
  task: TaskResponse;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white rounded-md px-4 py-2 flex flex-col gap-1">
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="icon">
          <SquarePenIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2Icon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
