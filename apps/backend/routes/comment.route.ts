import { Router } from "express";
import {
    commentIdSchema,
    createCommentSchema,
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

const router = Router();

router.post("/", validateBody(createCommentSchema), createCommentController);

router.get("/", getCommentsController);

router.get(
    "/:commentId",
    validateParams(commentIdSchema),
    getCommentByIdController,
);

router.patch(
    "/:commentId",
    validateParams(commentIdSchema),
    validateBody(updateCommentSchema),
    updateCommentController,
);

router.delete(
    "/:commentId",
    validateParams(commentIdSchema),
    deleteCommentController,
);

export default router;