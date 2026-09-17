import type { Request, Response } from "express";
import {
	createSection,
	getSections,
	getSectionById,
	updateSection,
	deleteSection,
} from "../services/section.service";

export async function createSectionController(
	req: Request<{ orgId: string; boardId: string }>,
	res: Response,
) {
	const { sectionTitle } = req.body;
	const section = await createSection(
		sectionTitle,
		req.params.boardId,
		req.params.orgId,
	);
	if (!section) return res.status(404).json({ message: "Board not found" });
	return res.status(201).json(section);
}

export async function getSectionsController(
	req: Request<{ orgId: string; boardId: string }>,
	res: Response,
) {
	return res
		.status(200)
		.json(await getSections(req.params.boardId, req.params.orgId));
}

export async function getSectionByIdController(
	req: Request<{ orgId: string; boardId: string; sectionId: string }>,
	res: Response,
) {
	const sectionId = req.params.sectionId as string;
	const section = await getSectionById(
		sectionId,
		req.params.boardId,
		req.params.orgId,
	);
	if (!section) return res.status(404).json({ message: "Section not found" });
	return res.status(200).json(section);
}

export async function updateSectionController(
	req: Request<{ orgId: string; boardId: string; sectionId: string }>,
	res: Response,
) {
	const sectionId = req.params.sectionId as string;
	const section = await updateSection(
		sectionId,
		req.params.boardId,
		req.params.orgId,
		req.body.sectionTitle,
	);
	if (!section) return res.status(404).json({ message: "Section not found" });
	return res.status(200).json(section);
}

export async function deleteSectionController(
	req: Request<{ orgId: string; boardId: string; sectionId: string }>,
	res: Response,
) {
	const sectionId = req.params.sectionId as string;
	const section = await deleteSection(
		sectionId,
		req.params.boardId,
		req.params.orgId,
	);
	if (!section) return res.status(404).json({ message: "Section not found" });
	return res.status(204).send();
}
