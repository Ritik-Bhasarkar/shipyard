import { z } from "zod";

export const createSectionSchema = z.object({
    sectionTitle: z.string().trim().min(1),
    boardId: z.string().trim().min(1),
});

export const updateSectionSchema = z.object({
    sectionTitle: z.string().trim().min(1).optional(),
});

export type CreateSectionProps = z.infer<typeof createSectionSchema>;
export type UpdateSectionProps = z.infer<typeof updateSectionSchema>;
