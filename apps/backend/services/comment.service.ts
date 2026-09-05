import { prisma } from "db/client";

export function createComment(
    commentText: string,
    issueId: string,
    userId: string,
) {
    return prisma.comment.create({
        data: {
            commentText,
            issueId,
            userId,
        },
    });
}

export function getComments() {
    return prisma.comment.findMany({
        include: {
            user: {
                select: {
                    userId: true,
                    username: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

export function getCommentById(commentId: string) {
    return prisma.comment.findUnique({
        where: {
            commentId,
        },
        include: {
            user: {
                select: {
                    userId: true,
                    username: true,
                },
            },
        },
    });
}

export function updateComment(commentId: string, commentText: string) {
    return prisma.comment.update({
        where: {
            commentId,
        },
        data: {
            commentText,
        },
    });
}

export function deleteComment(commentId: string) {
    return prisma.comment.delete({
        where: {
            commentId,
        },
    });
}
