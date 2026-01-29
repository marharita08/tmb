import { BackendRouterKey } from "@/const/backend-router-key";
import type { AddBoardSchema } from "@/schemas/add-board.schema";
import type { BoardResponse } from "@/types/board.type";

import { httpService } from "./http.service";

class BoardService {
  async create(data: AddBoardSchema) {
    return httpService.post<BoardResponse, AddBoardSchema>(
      BackendRouterKey.BOARDS,
      data,
    );
  }

  async findOne(id: string) {
    return httpService.get<BoardResponse>(`${BackendRouterKey.BOARDS}/${id}`);
  }
}

export const boardService = new BoardService();
