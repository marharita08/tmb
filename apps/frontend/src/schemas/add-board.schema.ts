import { z } from "zod";

export const addBoardSchema = z.object({
  title: z.string().min(1),
});

export type AddBoardSchema = z.infer<typeof addBoardSchema>;
