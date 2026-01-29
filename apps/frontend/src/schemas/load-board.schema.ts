import { z } from "zod";

export const loadBoardSchema = z.object({
  boardId: z.string().min(1),
});

export type LoadBoardSchema = z.infer<typeof loadBoardSchema>;
