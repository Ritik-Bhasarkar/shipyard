import "server-only";
import { ROOT_URL } from "@/root.url";

interface CreateOrganizationParams {
	orgName: string;
	orgDescription?: string;
}

interface GetOrganizationByIdParams {
	orgId: string;
}

interface DeleteOrganizationParams {
	orgId: string;
}

export async function createOrganization({
	orgName,
	orgDescription,
}: CreateOrganizationParams) {
	const response = await fetch(`${ROOT_URL}/organization`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			orgName,
			orgDescription,
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to create organization");
	}

	return response.json();
}

export async function getOrganizationById({
	orgId,
}: GetOrganizationByIdParams) {
	const response = await fetch(`${ROOT_URL}/organization/${orgId}`);

	if (!response.ok) {
		throw new Error("Failed to get Organization");
	}

	return response.json();
}

export async function deleteOrganization({ orgId }: DeleteOrganizationParams) {
	const response = await fetch(`${ROOT_URL}/organization/${orgId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete organization");
	}
}
