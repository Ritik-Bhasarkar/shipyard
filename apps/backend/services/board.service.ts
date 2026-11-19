import { prisma } from "db/client";
import type {
	CreateBoardParams,
	GetBoardsParams,
	GetBoardbyIdParams,
	UpdateBoardParams,
	DeleteBoardParams,
} from "../types/boards.types";

export async function createBoard({ boardName, orgId }: CreateBoardParams) {
	return await prisma.board.create({
		data: {
			boardName,
			orgId,
		},
	});
}

export async function getBoards({ orgId }: GetBoardsParams) {
	return await prisma.board.findMany({
		where: {
			orgId,
		},
	});
}

export async function getBoardById({ boardId }: GetBoardbyIdParams) {
	return await prisma.board.findUnique({
		where: {
			boardId,
		},
	});
}

export async function updateBoardById({
	boardId,
	boardName,
}: UpdateBoardParams) {
	return await prisma.board.update({
		where: {
			boardId,
		},

		data: {
			...(boardName !== undefined ? { boardName } : {}),
		},
	});
}

export async function deleteBoardById({ boardId }: DeleteBoardParams) {
	return await prisma.board.delete({
		where: {
			boardId,
		},
	});
}
