import { prisma } from "db/client";

export function createIssue(
    issueName: string,
    issueDescription: string | undefined,
    boardId: string,
    sectionId: string,
) {
    return prisma.issue.create({
        data: {
            issueName,
            issueDescription,
            boardId,
            sectionId,
        },
    });
}

export function getIssues() {
    return prisma.issue.findMany({
        include: {
            assignees: true,
            comments: true,
        },
    });
}
export function getIssueById(issueId: string) {
    return prisma.issue.findUnique({
        where: {
            issueId,
        },
        include: {
            assignees: true,
            comments: true,
        },
    });
}
export function updateIssue(
    issueId: string,
    data: {
        issueName?: string;
        issueDescription?: string;
        sectionId?: string;
    },
) {
    return prisma.issue.update({
        where: {
            issueId,
        },
        data,
    });
}
export function deleteIssue(issueId: string) {
    return prisma.issue.delete({
        where: {
            issueId,
        },
    });
}
