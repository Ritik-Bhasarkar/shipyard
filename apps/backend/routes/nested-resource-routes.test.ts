import { describe, expect, test } from "bun:test";
import {
	createCommentSchema,
	createIssueSchema,
	createSectionSchema,
	organizationBoardIdSchema,
	organizationBoardIssueIdSchema,
	organizationBoardIssueCommentIdSchema,
} from "validation";
import sectionRouter from "./section.route";
import issueRouter from "./issue.route";
import commentRouter from "./comment.route";

describe("nested resource routes", () => {
	test("section creation takes board identity from the route", () => {
		expect(
			createSectionSchema.safeParse({ sectionTitle: "Todo" }).success,
		).toBe(true);
	});

	test("issue creation takes board identity from the route", () => {
		expect(
			createIssueSchema.safeParse({
				issueName: "Ship feature",
				sectionId: "section-1",
			}).success,
		).toBe(true);
	});

	test("comment creation takes issue identity from the route", () => {
		expect(
			createCommentSchema.safeParse({
				commentText: "Looks good",
				userId: "user-1",
			}).success,
		).toBe(true);
	});

	test("all nested routers merge parent parameters", () => {
		expect((sectionRouter as any).mergeParams).toBe(true);
		expect((issueRouter as any).mergeParams).toBe(true);
		expect((commentRouter as any).mergeParams).toBe(true);
	});

	test("provides combined schemas for nested item parameters", () => {
		expect(
			organizationBoardIdSchema.safeParse({
				orgId: "org-1",
				boardId: "board-1",
			}).success,
		).toBe(true);
		expect(
			organizationBoardIssueIdSchema.safeParse({
				orgId: "org-1",
				boardId: "board-1",
				issueId: "issue-1",
			}).success,
		).toBe(true);
		expect(
			organizationBoardIssueCommentIdSchema.safeParse({
				orgId: "org-1",
				boardId: "board-1",
				issueId: "issue-1",
				commentId: "comment-1",
			}).success,
		).toBe(true);
	});
});
