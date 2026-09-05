import { z } from "zod";

export const createOrganizationSchema = z.object({
    orgName: z.string().trim().min(1),
    orgDescription: z.string().trim().min(1).optional(),
});

export type CreateOrganizationProps = z.infer<typeof createOrganizationSchema>;
