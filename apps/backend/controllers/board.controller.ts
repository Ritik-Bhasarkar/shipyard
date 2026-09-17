import type { Request, Response } from "express";
import {
	createBoard,
	getBoards,
	getBoardById,
	updateBoardById,
	deleteBoardById,
} from "../services/board.service";

export async function createBoardController(
	req: Request<{ orgId: string }>,
	res: Response,
) {
	const { orgId } = req.params;
	const { boardName } = req.body;

	const board = await createBoard(boardName, orgId);
	return res.status(201).json(board);
}

export async function getBoardsController(
	req: Request<{ orgId: string }>,
	res: Response,
) {
	const { orgId } = req.params;

	const boards = await getBoards(orgId);
	return res.status(200).json(boards);
}

export async function getBoardByIdController(req: Request, res: Response) {
	const boardId = req.params.boardId as string;
	const board = await getBoardById(boardId);
	if (!board) return res.status(404).json({ message: "Board not found" });
	return res.status(200).json(board);
}

export async function updateBoardController(req: Request, res: Response) {
	const boardId = req.params.boardId as string;
	return res
		.status(200)
		.json(await updateBoardById(boardId, req.body.boardName));
}

export async function deleteBoardController(req: Request, res: Response) {
	const boardId = req.params.boardId as string;
	await deleteBoardById(boardId);
	return res.status(204).send();
}
