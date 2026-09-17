import { Router } from "express";
import {
	createIssueSchema,
	organizationBoardIdSchema,
	organizationBoardIssueIdSchema,
	updateIssueSchema,
} from "validation";
import {
	createIssueController,
	getIssuesController,
	getIssueByIdController,
	updateIssueController,
	deleteIssueController,
} from "../controllers/issue.controller";
import {
	validateBody,
	validateParams,
} from "../middleware/validation.middleware";

const router = Router({ mergeParams: true });

router.post(
	"/",
	validateParams(organizationBoardIdSchema),
	validateBody(createIssueSchema),
	createIssueController,
);

router.get("/", validateParams(organizationBoardIdSchema), getIssuesController);

router.get(
	"/:issueId",
	validateParams(organizationBoardIssueIdSchema),
	getIssueByIdController,
);

router.patch(
	"/:issueId",
	validateParams(organizationBoardIssueIdSchema),
	validateBody(updateIssueSchema),
	updateIssueController,
);

router.delete(
	"/:issueId",
	validateParams(organizationBoardIssueIdSchema),
	deleteIssueController,
);

export default router;
