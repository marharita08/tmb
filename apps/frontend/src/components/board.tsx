import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import { closestCenter } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { QueryKey } from "@/const/query-key";
import { TaskStatus } from "@/const/task-status";
import { useMoveTask } from "@/hooks/use-move-task";
import { useCurrentBoardStore } from "@/store/current-board.store";
import type { PaginatedResponse } from "@/types/paginated-response.type";
import type { TaskResponse } from "@/types/task.type";

import { BoardColumn } from "./board-column";
import { DeleteBoardDialog } from "./delete-board-dialog";
import { EditBoardDialog } from "./edit-board.dialog";
import { TaskCard } from "./task-card";

export const Board = () => {
  const { board } = useCurrentBoardStore();
  const queryClient = useQueryClient();
  const [activeTask, setActiveTask] = useState<TaskResponse | null>(null);

  const { mutate: moveTask } = useMoveTask();

  const getTasksByStatus = () => {
    if (!board) return null;
    const result: Record<TaskStatus, TaskResponse[]> = {} as Record<
      TaskStatus,
      TaskResponse[]
    >;
    Object.values(TaskStatus).forEach((status) => {
      const data =
        queryClient.getQueryData<PaginatedResponse<TaskResponse>>([
          QueryKey.TASKS,
          board.id,
          status,
        ]) ?? [];
      if (data && "pages" in data) {
        result[status] = (
          data.pages as PaginatedResponse<TaskResponse>[]
        ).flatMap(
          (page: PaginatedResponse<TaskResponse>) => page.items,
        ) as TaskResponse[];
      }
    });
    return result;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask((event.active.data.current as TaskResponse) ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id as string;

    const activeStatus = active.data.current?.status as TaskStatus;
    const overStatus =
      (over.data.current?.status as TaskStatus) ?? (over.id as TaskStatus);

    if (!activeStatus || !overStatus) return;

    const tasksByStatus = getTasksByStatus();
    if (!tasksByStatus) return;

    const sourceTasks = tasksByStatus[activeStatus] ?? [];
    const targetTasksOriginal = tasksByStatus[overStatus] ?? [];

    const targetTasks = targetTasksOriginal.filter(
      (t) => t.id !== activeTaskId,
    );

    const activeIndex = sourceTasks.findIndex((t) => t.id === activeTaskId);

    const overIndex = targetTasks.findIndex((t) => t.id === over.id);

    let insertIndex = overIndex === -1 ? targetTasks.length : overIndex;

    if (activeStatus === overStatus && activeIndex <= overIndex) {
      insertIndex += 1;
    }

    targetTasks.splice(insertIndex, 0, {
      ...sourceTasks[activeIndex],
      status: overStatus,
    });

    const prevTaskId = targetTasks[insertIndex - 1]?.id;
    const nextTaskId = targetTasks[insertIndex + 1]?.id;

    queryClient.setQueryData(
      [QueryKey.TASKS, board?.id, activeStatus],
      (old: { pages?: PaginatedResponse<TaskResponse>[] }) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: PaginatedResponse<TaskResponse>) => ({
            ...page,
            items: page.items.filter(
              (t: TaskResponse) => t.id !== activeTaskId,
            ),
          })),
        };
      },
    );

    queryClient.setQueryData(
      [QueryKey.TASKS, board?.id, overStatus],
      (old: { pages?: PaginatedResponse<TaskResponse>[] }) => {
        if (!old?.pages) return old;

        const flat = old.pages.flatMap(
          (p: PaginatedResponse<TaskResponse>) => p.items,
        );

        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              items: targetTasks,
            },
            ...old.pages.slice(1).map((p: PaginatedResponse<TaskResponse>) => ({
              ...p,
              items: p.items.filter(
                (t: TaskResponse) =>
                  !flat.some((x: TaskResponse) => x.id === t.id),
              ),
            })),
          ],
        };
      },
    );

    moveTask(
      {
        id: activeTaskId,
        data: {
          targetStatus: overStatus,
          prevTaskId,
          nextTaskId,
        },
      },
      {
        onError: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKey.TASKS, board?.id ?? "", activeStatus],
          });
          queryClient.invalidateQueries({
            queryKey: [QueryKey.TASKS, board?.id ?? "", overStatus],
          });
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKey.TASKS, board?.id ?? "", activeStatus],
          });
          queryClient.invalidateQueries({
            queryKey: [QueryKey.TASKS, board?.id ?? "", overStatus],
          });
        },
      },
    );
  };

  return (
    <>
      {board && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <h3 className="text-xl font-semibold text-center">
              {board.title}{" "}
              <span className="font-normal">(id: {board.id})</span>
            </h3>
            <EditBoardDialog board={board} />
            <DeleteBoardDialog board={board} />
          </div>

          <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            collisionDetection={closestCenter}
          >
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {Object.values(TaskStatus).map((taskStatus) => (
                <BoardColumn key={taskStatus} taskStatus={taskStatus} />
              ))}
            </div>
            <DragOverlay>
              {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
            </DragOverlay>
          </DndContext>
        </section>
      )}
    </>
  );
};
