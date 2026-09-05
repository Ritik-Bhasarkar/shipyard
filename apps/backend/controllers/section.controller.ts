import type { Request, Response } from "express";
import {
	createSection,
	getSections,
	getSectionById,
	updateSection,
	deleteSection,
} from "../services/section.service";

export async function createSectionController(req: Request, res: Response) {
	const { sectionTitle, boardId } = req.body;
	return res.status(201).json(await createSection(sectionTitle, boardId));
}

export async function getSectionsController(req: Request, res: Response) {
	return res.status(200).json(await getSections());
}

export async function getSectionByIdController(req: Request, res: Response) {
	const sectionId = req.params.sectionId as string;
	const section = await getSectionById(sectionId);
	if (!section) return res.status(404).json({ message: "Section not found" });
	return res.status(200).json(section);
}

export async function updateSectionController(req: Request, res: Response) {
	const sectionId = req.params.sectionId as string;
	return res
		.status(200)
		.json(await updateSection(sectionId, req.body.sectionTitle));
}

export async function deleteSectionController(req: Request, res: Response) {
	const sectionId = req.params.sectionId as string;
	await deleteSection(sectionId);
	return res.status(204).send();
}
