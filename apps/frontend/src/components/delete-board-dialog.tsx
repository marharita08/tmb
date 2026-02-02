import { Trash2Icon } from "lucide-react";
import { useState } from "react";

import { useDeleteBoard } from "@/hooks/use-delete-board";
import type { BoardResponse } from "@/types/board.type";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type DeleteBoardDialogProps = {
  board: BoardResponse;
};

export const DeleteBoardDialog: React.FC<DeleteBoardDialogProps> = ({
  board,
}) => {
  const [open, setOpen] = useState(false);
  const deleteBoardMutation = useDeleteBoard();

  const handleDelete = () => {
    deleteBoardMutation.mutate(board.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Board</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 py-3">
          <div>
            Are you sure you want to delete the board{" "}
            <span className="font-bold">{board.title}</span> ({board.id})?
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
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
