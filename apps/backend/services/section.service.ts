import { prisma } from "db/client";
import type {
	CreateSectionParams,
	GetSectionsParams,
	GetSectionByIdParams,
	UpdateSectionParams,
	DeleteSectionParams,
} from "../types/section.types";

export async function createSection({
	orgId,
	boardId,
	sectionTitle,
}: CreateSectionParams) {
	const board = await prisma.board.findFirst({
		where: { orgId, boardId },
		select: { boardId: true },
	});

	if (!board) return null;

	return prisma.section.create({
		data: {
			boardId,
			sectionTitle,
		},
	});
}

export function getSections({ boardId, orgId }: GetSectionsParams) {
	return prisma.section.findMany({
		where: { boardId, board: { orgId } },
		orderBy: {
			sectionTitle: "asc",
		},
	});
}

export function getSectionById({
	sectionId,
	boardId,
	orgId,
}: GetSectionByIdParams) {
	return prisma.section.findFirst({
		where: { sectionId, boardId, board: { orgId } },
	});
}

export async function updateSection({
	sectionId,
	boardId,
	orgId,
	sectionTitle,
}: UpdateSectionParams) {
	const section = await getSectionById({
		sectionId,
		boardId,
		orgId,
	});

	if (!section) return null;

	return prisma.section.update({
		where: { sectionId },
		data: sectionTitle === undefined ? {} : { sectionTitle },
	});
}

export async function deleteSection({
	sectionId,
	boardId,
	orgId,
}: DeleteSectionParams) {
	const section = await getSectionById({
		sectionId,
		boardId,
		orgId,
	});

	if (!section) return null;

	return prisma.section.delete({
		where: { sectionId },
	});
}
