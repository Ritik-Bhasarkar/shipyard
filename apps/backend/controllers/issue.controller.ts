import type { Request, Response } from "express";
import {
	createIssue,
	getIssues,
	getIssueById,
	updateIssue,
	deleteIssue,
} from "../services/issue.service";

export async function createIssueController(req: Request, res: Response) {
	const { issueName, issueDescription, boardId, sectionId } = req.body;
	return res
		.status(201)
		.json(
			await createIssue(issueName, issueDescription, boardId, sectionId),
		);
}

export async function getIssuesController(req: Request, res: Response) {
	return res.status(200).json(await getIssues());
}

export async function getIssueByIdController(req: Request, res: Response) {
	const issueId = req.params.issueId as string;
	const issue = await getIssueById(issueId);
	if (!issue) return res.status(404).json({ message: "Issue not found" });
	return res.status(200).json(issue);
}

export async function updateIssueController(req: Request, res: Response) {
	const issueId = req.params.issueId as string;
	return res.status(200).json(await updateIssue(issueId, req.body));
}

export async function deleteIssueController(req: Request, res: Response) {
	const issueId = req.params.issueId as string;
	await deleteIssue(issueId);
	return res.status(204).send();
}
