import { useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";

import { QueryKey } from "@/const/query-key";
import { TaskStatus } from "@/const/task-status";
import { useDeleteTask } from "@/hooks/use-delete-task";
import { useCurrentBoardStore } from "@/store/current-board.store";
import type { TaskResponse } from "@/types/task.type";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type DeleteTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskResponse;
};

export const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  open,
  onOpenChange,
  task,
}) => {
  const deleteTaskMutation = useDeleteTask(task.status);
  const queryClient = useQueryClient();
  const { board } = useCurrentBoardStore();

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id, {
      onSuccess: () => {
        console.log(
          "[BEFORE INVALIDATE]",
          "boardId:",
          board?.id ?? "",
          "status:",
          task.status,
          queryClient.getQueriesData({
            queryKey: [QueryKey.TASKS, board?.id ?? "", TaskStatus.TODO],
            exact: false,
          }),
        );
        console.log("ALL QUERIES", queryClient.getQueryCache().getAll());
        queryClient.invalidateQueries({
          queryKey: [QueryKey.TASKS, board?.id ?? "", TaskStatus.TODO],
          exact: false,
        });
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 py-3">
          <div>
            Are you sure you want to delete the task{" "}
            <span className="font-bold">{task.title}</span>?
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2Icon className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
