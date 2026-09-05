import { z } from "zod";

export const createCommentSchema = z.object({
    commentText: z.string().trim().min(1),
    issueId: z.string().trim().min(1),
    userId: z.string().trim().min(1),
});

export const updateCommentSchema = z.object({
    commentText: z.string().trim().min(1),
});

export type CreateCommentProps = z.infer<typeof createCommentSchema>;
export type UpdateCommentProps = z.infer<typeof updateCommentSchema>;
