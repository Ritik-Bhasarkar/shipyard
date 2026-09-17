import "server-only";
import { ROOT_URL } from "@/root.url";

export async function createOrganization(
	orgName: string,
	orgDescription?: string,
) {
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

export async function getOrganizationById(orgId: string) {
	const response = await fetch(`${ROOT_URL}/organization/${orgId}`);

	if (!response.ok) {
		throw Error("Failed to get Organization");
	}

	return response.json();
}

export async function deleteOrganization(orgId: string) {
	const response = await fetch(`${ROOT_URL}/organization/${orgId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete organization");
	}
}
