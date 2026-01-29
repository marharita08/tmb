import { MutationKey } from "@/const/mutation-key";
import { taskService } from "@/services/task.service";

import { useAppMutation } from "./use-app-mutation";
import { toast } from "./use-toast";

export const useCreateTaskMutation = () => {
  return useAppMutation([MutationKey.CREATE_TASK], {
    mutationFn: taskService.create,
    onSuccess: () => {
      toast({
        title: "Task created successfully",
        variant: "success",
      });
    },
  });
};
