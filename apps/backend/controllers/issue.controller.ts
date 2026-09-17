import type { Request, Response } from "express";
import {
	createIssue,
	getIssues,
	getIssueById,
	updateIssue,
	deleteIssue,
} from "../services/issue.service";

export async function createIssueController(
	req: Request<{ orgId: string; boardId: string }>,
	res: Response,
) {
	const { issueName, issueDescription, sectionId } = req.body;
	const issue = await createIssue(
		issueName,
		issueDescription,
		req.params.boardId,
		sectionId,
		req.params.orgId,
	);
	if (!issue)
		return res.status(404).json({ message: "Board or section not found" });
	return res.status(201).json(issue);
}

export async function getIssuesController(
	req: Request<{ orgId: string; boardId: string }>,
	res: Response,
) {
	return res
		.status(200)
		.json(await getIssues(req.params.boardId, req.params.orgId));
}

export async function getIssueByIdController(
	req: Request<{ orgId: string; boardId: string; issueId: string }>,
	res: Response,
) {
	const issueId = req.params.issueId as string;
	const issue = await getIssueById(
		issueId,
		req.params.boardId,
		req.params.orgId,
	);
	if (!issue) return res.status(404).json({ message: "Issue not found" });
	return res.status(200).json(issue);
}

export async function updateIssueController(
	req: Request<{ orgId: string; boardId: string; issueId: string }>,
	res: Response,
) {
	const issueId = req.params.issueId as string;
	const issue = await updateIssue(
		issueId,
		req.params.boardId,
		req.params.orgId,
		req.body,
	);
	if (!issue) return res.status(404).json({ message: "Issue not found" });
	return res.status(200).json(issue);
}

export async function deleteIssueController(
	req: Request<{ orgId: string; boardId: string; issueId: string }>,
	res: Response,
) {
	const issueId = req.params.issueId as string;
	const issue = await deleteIssue(
		issueId,
		req.params.boardId,
		req.params.orgId,
	);
	if (!issue) return res.status(404).json({ message: "Issue not found" });
	return res.status(204).send();
}
