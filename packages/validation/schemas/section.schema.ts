import { z } from "zod";

export const createSectionSchema = z.object({
    sectionTitle: z.string().trim().min(1),
    boardId: z.string().trim().min(1),
});

export const updateSectionSchema = z
    .object({
        sectionTitle: z.string().trim().min(1).optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
        message: "At least one field is required",
    });

export type CreateSectionProps = z.infer<typeof createSectionSchema>;
export type UpdateSectionProps = z.infer<typeof updateSectionSchema>;
