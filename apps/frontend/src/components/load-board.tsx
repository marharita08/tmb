import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcwIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import InputError from "@/components/ui/input-error";
import { useGetBoard } from "@/hooks/use-get-board";
import {
  type LoadBoardSchema,
  loadBoardSchema,
} from "@/schemas/load-board.schema";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const LoadBoard = () => {
  const form = useForm<LoadBoardSchema>({
    resolver: zodResolver(loadBoardSchema),
    defaultValues: {
      boardId: "",
    },
  });

  const getBoardMutation = useGetBoard();

  const onSubmit = (data: LoadBoardSchema) => {
    getBoardMutation.mutate(data.boardId, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const isEmpty = !form.watch("boardId");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
      <div className="flex-1 flex flex-col gap-1">
        <Input
          {...form.register("boardId")}
          placeholder="Input board ID here..."
          error={!!form.formState.errors.boardId}
          isEmpty={isEmpty}
        />
        <InputError error={form.formState.errors.boardId?.message} />
      </div>
      <Button type="submit" disabled={getBoardMutation.isPending || isEmpty}>
        <RefreshCcwIcon className="w-4 h-4" />
        Load
      </Button>
    </form>
  );
};
