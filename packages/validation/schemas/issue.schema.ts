import { z } from "zod";

export const createIssueSchema = z.object({
    issueName: z.string().trim().min(1),
    issueDescription: z.string().trim().min(1).optional(),
    boardId: z.string().trim().min(1),
    sectionId: z.string().trim().min(1),
});

export const updateIssueSchema = z.object({
    issueName: z.string().trim().min(1).optional(),
    issueDescription: z.string().trim().min(1).optional(),
    sectionId: z.string().trim().min(1).optional(),
});

export type CreateIssueProps = z.infer<typeof createIssueSchema>;
export type UpdateIssueProps = z.infer<typeof updateIssueSchema>;
