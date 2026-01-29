import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { QueryKey } from "@/const/query-key";
import { TaskStatus } from "@/const/task-status";
import { useCreateTaskMutation } from "@/hooks/use-create-task-mutation";
import { type AddTaskSchema, addTaskSchema } from "@/schemas/add-task.schema";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import InputError from "./ui/input-error";
import { Textarea } from "./ui/textarea";

export const AddTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const { board } = useCurrentBoardStore();
  const queryClient = useQueryClient();

  const form = useForm<AddTaskSchema>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      boardId: board?.id ?? "",
    },
  });

  const createTaskMutation = useCreateTaskMutation();

  const onSubmit = (data: AddTaskSchema) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        queryClient.invalidateQueries({
          queryKey: [
            QueryKey.TASKS,
            { boardId: board?.id ?? "", status: TaskStatus.TODO },
          ],
          exact: true,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="bg-white rounded-md px-4 py-2 flex justify-center cursor-pointer hover:text-primary w-full">
          <PlusIcon className="w-10 h-10" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createTaskMutation.isPending}>
              <PlusIcon className="w-4 h-4" />
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
