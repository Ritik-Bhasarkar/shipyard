import { prisma } from "db/client";

export async function createSection(
	sectionTitle: string,
	boardId: string,
	orgId: string,
) {
	const board = await prisma.board.findFirst({
		where: { boardId, orgId },
		select: { boardId: true },
	});
	if (!board) return null;

	return prisma.section.create({
		data: {
			sectionTitle,
			boardId,
		},
	});
}

export function getSections(boardId: string, orgId: string) {
	return prisma.section.findMany({
		where: { boardId, board: { orgId } },
		orderBy: {
			sectionTitle: "asc",
		},
	});
}

export function getSectionById(
	sectionId: string,
	boardId: string,
	orgId: string,
) {
	return prisma.section.findFirst({
		where: { sectionId, boardId, board: { orgId } },
	});
}

export async function updateSection(
	sectionId: string,
	boardId: string,
	orgId: string,
	sectionTitle?: string,
) {
	const section = await getSectionById(sectionId, boardId, orgId);
	if (!section) return null;

	return prisma.section.update({
		where: { sectionId },
		data: sectionTitle === undefined ? {} : { sectionTitle },
	});
}

export async function deleteSection(
	sectionId: string,
	boardId: string,
	orgId: string,
) {
	const section = await getSectionById(sectionId, boardId, orgId);
	if (!section) return null;

	return prisma.section.delete({ where: { sectionId } });
}
