import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateBoard } from "@/hooks/use-create-board";
import {
  type AddBoardSchema,
  addBoardSchema,
} from "@/schemas/add-board.schema";

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

export const AddBoardDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<AddBoardSchema>({
    resolver: zodResolver(addBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  const createBoardMutation = useCreateBoard();

  const onSubmit = (data: AddBoardSchema) => {
    createBoardMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4" />
          Add Board
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Board</DialogTitle>
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
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <PlusIcon className="w-4 h-4" />
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
