import { prisma } from "db/client";
import type {
	CreateOrganizationParams,
	GetOrganizationByIdParams,
	DeleteOrganizationParams,
} from "../types/organization.types";

export async function createOrganization({
	orgName,
	orgDescription,
}: CreateOrganizationParams) {
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

export async function getOrganizationById({
	orgId,
}: GetOrganizationByIdParams) {
	return await prisma.organization.findUnique({
		where: {
			orgId,
		},
	});
}

export async function deleteOrganization({ orgId }: DeleteOrganizationParams) {
	return await prisma.organization.delete({
		where: {
			orgId,
		},
	});
}
