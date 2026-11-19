import { ROOT_URL } from "@/root.url";

export interface Board {
	boardId: string;
	boardName: string;
	orgId: string;
}

export async function fetchBoards(orgId: string): Promise<Board[]> {
	const response = await fetch(`${ROOT_URL}/organizations/${orgId}/boards`);

	if (!response.ok) {
		throw new Error("Failed to fetch boards");
	}

	const data = await response.json();
	return data ?? [];
}

export async function createBoard(orgId: string, boardName: string) {
	const response = await fetch(`${ROOT_URL}/organizations/${orgId}/boards`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ boardName }),
	});

	if (!response.ok) {
		throw new Error("Failed to create board");
	}

	return response.json();
}

export async function deleteBoard(
	orgId: string,
	boardId: string,
): Promise<void> {
	const response = await fetch(
		`${ROOT_URL}/organizations/${orgId}/boards/${boardId}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!response.ok) {
		throw new Error("Failed to delete Board");
	}
}
