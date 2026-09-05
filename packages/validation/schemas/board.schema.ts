import { z } from "zod";

export const createBoardSchema = z.object({
    boardName: z.string().trim().min(1),
    orgId: z.string().trim().min(1),
});

export const updateBoardSchema = z
    .object({
        boardName: z.string().trim().min(1).optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
        message: "At least one field is required",
    });

export type CreateBoardProps = z.infer<typeof createBoardSchema>;
export type UpdateBoardProps = z.infer<typeof updateBoardSchema>;
