import { MutationKey } from "@/const/mutation-key";
import type { UpdateTaskSchema } from "@/schemas/update-task.schema";
import { taskService } from "@/services/task.service";

import { useAppMutation } from "./use-app-mutation";
import { toast } from "./use-toast";

export const useUpdateTask = () => {
  return useAppMutation([MutationKey.UPDATE_TASK], {
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskSchema }) =>
      taskService.update(id, data),
    onSuccess: () => {
      toast({
        title: "Task updated successfully",
        variant: "success",
      });
    },
  });
};
