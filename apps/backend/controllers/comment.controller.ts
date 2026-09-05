import type { Request, Response } from "express";
import {
	createComment,
	getComments,
	getCommentById,
	updateComment,
	deleteComment,
} from "../services/comment.service";

export async function createCommentController(req: Request, res: Response) {
	const { commentText, issueId, userId } = req.body;
	return res
		.status(201)
		.json(await createComment(commentText, issueId, userId));
}

export async function getCommentsController(req: Request, res: Response) {
	return res.status(200).json(await getComments());
}

export async function getCommentByIdController(req: Request, res: Response) {
	const commentId = req.params.commentId as string;
	const comment = await getCommentById(commentId);
	if (!comment) return res.status(404).json({ message: "Comment not found" });
	return res.status(200).json(comment);
}

export async function updateCommentController(req: Request, res: Response) {
	const commentId = req.params.commentId as string;
	return res
		.status(200)
		.json(await updateComment(commentId, req.body.commentText));
}

export async function deleteCommentController(req: Request, res: Response) {
	const commentId = req.params.commentId as string;
	await deleteComment(commentId);
	return res.status(204).send();
}
