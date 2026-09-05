import { Router } from "express";
import {
    createIssueSchema,
    issueIdSchema,
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

const router = Router();

router.post("/", validateBody(createIssueSchema), createIssueController);

router.get("/", getIssuesController);

router.get("/:issueId", validateParams(issueIdSchema), getIssueByIdController);

router.patch(
    "/:issueId",
    validateParams(issueIdSchema),
    validateBody(updateIssueSchema),
    updateIssueController,
);

router.delete(
    "/:issueId",
    validateParams(issueIdSchema),
    deleteIssueController,
);

export default router;
