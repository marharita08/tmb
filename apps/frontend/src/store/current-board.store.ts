import { create } from "zustand";

import type { BoardResponse } from "@/types/board.type";

type State = {
  board: BoardResponse | null;
  setBoard: (board: BoardResponse) => void;
  clearBoard: () => void;
};

export const useCurrentBoardStore = create<State>((set) => ({
  board: null,
  setBoard: (board: BoardResponse) => set({ board }),
  clearBoard: () => set({ board: null }),
}));
