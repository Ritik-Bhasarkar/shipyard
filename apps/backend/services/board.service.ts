import { prisma } from "db/client";

export async function createBoard(boardName: string, orgId: string) {
    return await prisma.board.create({
        data: {
            boardName,
            orgId,
        },
    });
}

export async function getBoards() {
    return await prisma.board.findMany();
}

export async function getBoardById(boardId: string) {
    return await prisma.board.findUnique({
        where: {
            boardId,
        },
    });
}

export async function updateBoardById(boardId: string, boardName?: string) {
    return await prisma.board.update({
        where: {
            boardId,
        },

        data: {
            ...(boardName !== undefined ? { boardName } : {}),
        },
    });
}

export async function deleteBoardById(boardId: string) {
    return await prisma.board.delete({
        where: {
            boardId,
        },
    });
}
