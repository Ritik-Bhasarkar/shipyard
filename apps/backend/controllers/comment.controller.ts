import type { Request, Response } from "express";
import {
	createComment,
	getComments,
	getCommentById,
	updateComment,
	deleteComment,
} from "../services/comment.service";

export async function createCommentController(
	req: Request<{ orgId: string; boardId: string; issueId: string }>,
	res: Response,
) {
	const { commentText, userId } = req.body;
	const comment = await createComment(
		commentText,
		req.params.issueId,
		userId,
		req.params.boardId,
		req.params.orgId,
	);
	if (!comment) return res.status(404).json({ message: "Issue not found" });
	return res.status(201).json(comment);
}

export async function getCommentsController(
	req: Request<{ orgId: string; boardId: string; issueId: string }>,
	res: Response,
) {
	return res
		.status(200)
		.json(
			await getComments(
				req.params.issueId,
				req.params.boardId,
				req.params.orgId,
			),
		);
}

export async function getCommentByIdController(
	req: Request<{
		orgId: string;
		boardId: string;
		issueId: string;
		commentId: string;
	}>,
	res: Response,
) {
	const commentId = req.params.commentId as string;
	const comment = await getCommentById(
		commentId,
		req.params.issueId,
		req.params.boardId,
		req.params.orgId,
	);
	if (!comment) return res.status(404).json({ message: "Comment not found" });
	return res.status(200).json(comment);
}

export async function updateCommentController(
	req: Request<{
		orgId: string;
		boardId: string;
		issueId: string;
		commentId: string;
	}>,
	res: Response,
) {
	const commentId = req.params.commentId as string;
	const comment = await updateComment(
		commentId,
		req.params.issueId,
		req.params.boardId,
		req.params.orgId,
		req.body.commentText,
	);
	if (!comment) return res.status(404).json({ message: "Comment not found" });
	return res.status(200).json(comment);
}

export async function deleteCommentController(
	req: Request<{
		orgId: string;
		boardId: string;
		issueId: string;
		commentId: string;
	}>,
	res: Response,
) {
	const commentId = req.params.commentId as string;
	const comment = await deleteComment(
		commentId,
		req.params.issueId,
		req.params.boardId,
		req.params.orgId,
	);
	if (!comment) return res.status(404).json({ message: "Comment not found" });
	return res.status(204).send();
}
