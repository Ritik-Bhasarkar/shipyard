import { Router } from "express";
import {
    boardIdSchema,
    createBoardSchema,
    updateBoardSchema,
} from "validation";
import {
    createBoardController,
    getBoardsController,
    getBoardByIdController,
    updateBoardController,
    deleteBoardController,
} from "../controllers/board.controller";
import {
    validateBody,
    validateParams,
} from "../middleware/validation.middleware";

const router = Router();

router.post("/", validateBody(createBoardSchema), createBoardController);

router.get("/", getBoardsController);

router.get("/:boardId", validateParams(boardIdSchema), getBoardByIdController);

router.patch(
    "/:boardId",
    validateParams(boardIdSchema),
    validateBody(updateBoardSchema),
    updateBoardController,
);

router.delete(
    "/:boardId",
    validateParams(boardIdSchema),
    deleteBoardController,
);

export default router;
