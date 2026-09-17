import { prisma } from "db/client";

export function createIssue(
	issueName: string,
	issueDescription: string | undefined,
	boardId: string,
	sectionId: string,
	orgId: string,
) {
	return prisma.section
		.findFirst({
			where: { sectionId, boardId, board: { orgId } },
			select: { sectionId: true },
		})
		.then((section) => {
			if (!section) return null;
			return prisma.issue.create({
				data: {
					issueName,
					issueDescription,
					boardId,
					sectionId,
				},
			});
		});
}

export function getIssues(boardId: string, orgId: string) {
	return prisma.issue.findMany({
		where: { boardId, board: { orgId } },
		include: {
			assignees: true,
			comments: true,
		},
	});
}
export function getIssueById(issueId: string, boardId: string, orgId: string) {
	return prisma.issue.findFirst({
		where: { issueId, boardId, board: { orgId } },
		include: {
			assignees: true,
			comments: true,
		},
	});
}
export function updateIssue(
	issueId: string,
	boardId: string,
	orgId: string,
	data: {
		issueName?: string;
		issueDescription?: string;
		sectionId?: string;
	},
) {
	return getIssueById(issueId, boardId, orgId).then((issue) => {
		if (!issue) return null;
		return prisma.issue.update({
			where: { issueId },
			data,
		});
	});
}
export function deleteIssue(issueId: string, boardId: string, orgId: string) {
	return getIssueById(issueId, boardId, orgId).then((issue) => {
		if (!issue) return null;
		return prisma.issue.delete({ where: { issueId } });
	});
}
