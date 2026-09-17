import { prisma } from "db/client";

export function createComment(
	commentText: string,
	issueId: string,
	userId: string,
	boardId: string,
	orgId: string,
) {
	return prisma.issue
		.findFirst({
			where: { issueId, boardId, board: { orgId } },
			select: { issueId: true },
		})
		.then((issue) => {
			if (!issue) return null;
			return prisma.comment.create({
				data: {
					commentText,
					issueId,
					userId,
				},
			});
		});
}

export function getComments(issueId: string, boardId: string, orgId: string) {
	return prisma.comment.findMany({
		where: { issueId, issue: { boardId, board: { orgId } } },
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

export function getCommentById(
	commentId: string,
	issueId: string,
	boardId: string,
	orgId: string,
) {
	return prisma.comment.findFirst({
		where: { commentId, issueId, issue: { boardId, board: { orgId } } },
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

export function updateComment(
	commentId: string,
	issueId: string,
	boardId: string,
	orgId: string,
	commentText: string,
) {
	return getCommentById(commentId, issueId, boardId, orgId).then(
		(comment) => {
			if (!comment) return null;
			return prisma.comment.update({
				where: { commentId },
				data: {
					commentText,
				},
			});
		},
	);
}

export function deleteComment(
	commentId: string,
	issueId: string,
	boardId: string,
	orgId: string,
) {
	return getCommentById(commentId, issueId, boardId, orgId).then(
		(comment) => {
			if (!comment) return null;
			return prisma.comment.delete({ where: { commentId } });
		},
	);
}
