import { create } from "zustand";

import type { TaskResponse } from "@/types/task.type";

type State = {
  selectedTask: TaskResponse | null;
  isEditTaskDialogOpen: boolean;
  isDeleteTaskDialogOpen: boolean;
  openEditTaskDialog: (task: TaskResponse) => void;
  openDeleteTaskDialog: (task: TaskResponse) => void;
  closeEditTaskDialog: () => void;
  closeDeleteTaskDialog: () => void;
};

export const useTaskDialogsStore = create<State>((set) => ({
  selectedTask: null,
  isEditTaskDialogOpen: false,
  isDeleteTaskDialogOpen: false,
  openEditTaskDialog: (task: TaskResponse) =>
    set({ selectedTask: task, isEditTaskDialogOpen: true }),
  openDeleteTaskDialog: (task: TaskResponse) =>
    set({ selectedTask: task, isDeleteTaskDialogOpen: true }),
  closeEditTaskDialog: () =>
    set({ isEditTaskDialogOpen: false, selectedTask: null }),
  closeDeleteTaskDialog: () =>
    set({ isDeleteTaskDialogOpen: false, selectedTask: null }),
}));
