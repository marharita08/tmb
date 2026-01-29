import { TaskStatus, TaskStatusLabels } from "@/const/task-status";
import { TaskCard } from "./task-card";
import { useState } from "react";
import type { TaskResponse } from "@/types/task";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

type BoardColumnProps = {
  taskStatus: TaskStatus;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ taskStatus }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([{
    id: '1',
    title: 'Task 1',
    description: 'Task 1 description',
    status: taskStatus,
    position: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-center">{TaskStatusLabels[taskStatus]}</h3>
      <div className="bg-primary/20 p-4 rounded-md flex flex-col gap-4">
        {
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        }
        {
          taskStatus === TaskStatus.TODO && (
            <button className="bg-white rounded-md px-4 py-2 flex justify-center cursor-pointer hover:text-primary">
            
              <PlusIcon className="w-10 h-10" />
            
            </button>
          )
        }
      </div>
    </div>
  )
}
