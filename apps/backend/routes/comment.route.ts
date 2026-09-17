import { Router } from "express";
import {
	createCommentSchema,
	organizationBoardIssueIdSchema,
	organizationBoardIssueCommentIdSchema,
	updateCommentSchema,
} from "validation";
import {
	createCommentController,
	getCommentsController,
	getCommentByIdController,
	updateCommentController,
	deleteCommentController,
} from "../controllers/comment.controller";
import {
	validateBody,
	validateParams,
} from "../middleware/validation.middleware";

const router = Router({ mergeParams: true });

router.post(
	"/",
	validateParams(organizationBoardIssueIdSchema),
	validateBody(createCommentSchema),
	createCommentController,
);

router.get(
	"/",
	validateParams(organizationBoardIssueIdSchema),
	getCommentsController,
);

router.get(
	"/:commentId",
	validateParams(organizationBoardIssueCommentIdSchema),
	getCommentByIdController,
);

router.patch(
	"/:commentId",
	validateParams(organizationBoardIssueCommentIdSchema),
	validateBody(updateCommentSchema),
	updateCommentController,
);

router.delete(
	"/:commentId",
	validateParams(organizationBoardIssueCommentIdSchema),
	deleteCommentController,
);

export default router;
