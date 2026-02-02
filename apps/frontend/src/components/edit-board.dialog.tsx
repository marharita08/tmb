import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SaveIcon, SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { QueryKey } from "@/const/query-key";
import { useUpdateBoard } from "@/hooks/use-update-board";
import {
  type UpdateBoardSchema,
  updateBoardSchema,
} from "@/schemas/update-board.schema";
import { useCurrentBoardStore } from "@/store/current-board.store";
import type { BoardResponse } from "@/types/board.type";

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

type EditBoardDialogProps = {
  board: BoardResponse;
};

export const EditBoardDialog: React.FC<EditBoardDialogProps> = ({ board }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { setBoard } = useCurrentBoardStore();
  const form = useForm<UpdateBoardSchema>({
    resolver: zodResolver(updateBoardSchema),
    defaultValues: {
      title: board.title,
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setOpen(open);
  };

  const updateBoardMutation = useUpdateBoard();

  const onSubmit = (data: UpdateBoardSchema) => {
    updateBoardMutation.mutate(
      { id: board.id, data },
      {
        onSuccess: (data) => {
          setBoard(data);
          queryClient.invalidateQueries({
            queryKey: [QueryKey.BOARDS],
          });
          handleOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePenIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-4 py-3 flex flex-col gap-6"
        >
          <div>
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
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateBoardMutation.isPending}>
              <SaveIcon />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
