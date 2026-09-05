import { prisma } from "db/client";

export async function createOrganization(
    orgName: string,
    orgDescription?: string,
) {
    return await prisma.organization.create({
        data: {
            orgName,
            orgDescription,
        },
    });
}

export async function getOrganizations() {
    return await prisma.organization.findMany();
}

export async function getOrganizationById(orgId: string) {
    return await prisma.organization.findUnique({
        where: {
            orgId,
        },
    });
}

export async function deleteOrganization(orgId: string) {
    return await prisma.organization.delete({
        where: {
            orgId,
        },
    });
}
