import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { QueryKey } from "@/const/query-key";
import { useUpdateTask } from "@/hooks/use-update-task";
import {
  type UpdateTaskSchema,
  updateTaskSchema,
} from "@/schemas/update-task.schema";
import { useCurrentBoardStore } from "@/store/current-board.store";
import type { TaskResponse } from "@/types/task.type";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import InputError from "./ui/input-error";
import { Textarea } from "./ui/textarea";

type EditTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskResponse;
};

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  onOpenChange,
  task,
}) => {
  const { board } = useCurrentBoardStore();
  const queryClient = useQueryClient();

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  const updateTaskMutation = useUpdateTask();

  const onSubmit = (data: UpdateTaskSchema) => {
    updateTaskMutation.mutate(
      { id: task.id, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKey.TASKS, board?.id ?? "", task.status],
            exact: false,
          });
          handleOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-4 py-3 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <Input
              {...form.register("title")}
              label="Title"
              error={!!form.formState.errors.title}
              isEmpty={!form.watch("title")}
            />
            <InputError error={form.formState.errors.title?.message} />
          </div>
          <div className="flex flex-col gap-1">
            <Textarea
              className="max-h-40"
              label="Description"
              {...form.register("description")}
              error={!!form.formState.errors.description?.message}
              isEmpty={!form.watch("description")}
            />
            <InputError error={form.formState.errors.description?.message} />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateTaskMutation.isPending}>
              <SaveIcon className="w-4 h-4" />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
