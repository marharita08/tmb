import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import InputError from "@/components/ui/input-error";
import { useGetBoard } from "@/hooks/use-get-board";
import {
  type LoadBoardSchema,
  loadBoardSchema,
} from "@/schemas/load-board.schema";
import { useCurrentBoardStore } from "@/store/current-board.store";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const LoadBoard = () => {
  const form = useForm<LoadBoardSchema>({
    resolver: zodResolver(loadBoardSchema),
    defaultValues: {
      boardId: "",
    },
  });

  const { setBoard } = useCurrentBoardStore();

  const params = new URLSearchParams(window.location.search);
  const boardIdParam = params.get("boardId") ?? null;
  const [boardId, setBoardId] = useState<string | null>(boardIdParam ?? null);

  const { data } = useGetBoard(boardId);

  useEffect(() => {
    if (data) {
      setBoard(data);
    }
  }, [data, setBoard]);

  const onSubmit = (data: LoadBoardSchema) => {
    const params = new URLSearchParams(window.location.search);
    params.set("boardId", data.boardId);
    setBoardId(data.boardId);

    window.history.pushState({}, "", `?${params.toString()}`);
    form.reset();
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
      <Button type="submit" disabled={isEmpty}>
        <RefreshCcwIcon className="w-4 h-4" />
        Load
      </Button>
    </form>
  );
};
