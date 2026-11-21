import { ROOT_URL } from "@/root.url";

export interface Section {
	sectionId: string;
	sectionTitle: string;
	boardId: string;
}

export const createSection = async ({
	sectionTitle,
	orgId,
	boardId,
}: {
	sectionTitle: string;
	orgId: string;
	boardId: string;
}): Promise<Section> => {
	const response = await fetch(
		`${ROOT_URL}/organizations/${orgId}/boards/${boardId}/sections`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ sectionTitle }),
		},
	);

	if (!response.ok) {
		throw new Error("Failed to create section");
	}

	return response.json();
};

export const getSections = async ({
	orgId,
	boardId,
}: {
	orgId: string;
	boardId: string;
}): Promise<Section[]> => {
	const response = await fetch(
		`${ROOT_URL}/organizations/${orgId}/boards/${boardId}/sections`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch sections");
	}

	return response.json();
};

export const deleteSectionById = async ({
	orgId,
	boardId,
	sectionId,
}: {
	orgId: string;
	boardId: string;
	sectionId: string;
}): Promise<void> => {
	const response = await fetch(
		`${ROOT_URL}/organizations/${orgId}/boards/${boardId}/sections/${sectionId}`,
		{
			method: "DELETE",
		},
	);

	if (!response.ok) {
		throw new Error("Failed to delete section");
	}
};
