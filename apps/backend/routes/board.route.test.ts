import { describe, expect, test } from "bun:test";
import { createBoardSchema, organizationBoardIdSchema } from "validation";
import router from "./board.route";

describe("nested board routes", () => {
	test("accepts board creation data without an organization in the body", () => {
		expect(createBoardSchema.safeParse({ boardName: "Roadmap" }).success).toBe(
			true,
		);
	});

	test("merges the parent organization route parameters", () => {
		expect((router as any).mergeParams).toBe(true);
	});

	test("preserves the parent organization ID when validating an item route", () => {
		expect(
			organizationBoardIdSchema.safeParse({
				orgId: "org-1",
				boardId: "board-1",
			}).success,
		).toBe(true);
	});

	test("does not validate the board collection GET request body", () => {
		const collectionGet = (router as any).stack.find(
			(layer: any) => layer.route?.path === "/" && layer.route.methods.get,
		);

		expect(collectionGet?.route.stack).toHaveLength(2);
	});
});
