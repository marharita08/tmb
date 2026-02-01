import { useQueryClient } from "@tanstack/react-query";

import { MutationKey } from "@/const/mutation-key";
import { QueryKey } from "@/const/query-key";
import type { TaskStatus } from "@/const/task-status";
import { taskService } from "@/services/task.service";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { useAppMutation } from "./use-app-mutation";
import { toast } from "./use-toast";

export const useDeleteTask = (status: TaskStatus) => {
  const queryClient = useQueryClient();
  const { board } = useCurrentBoardStore();

  return useAppMutation([MutationKey.DELETE_TASK], {
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TASKS, board?.id ?? "", status],
      });
      toast({
        title: "Task deleted successfully",
        variant: "success",
      });
    },
  });
};
