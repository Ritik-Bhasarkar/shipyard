import { Router } from "express";
import {
	createBoardSchema,
	organizationIdSchema,
	organizationBoardIdSchema,
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

const router = Router({ mergeParams: true });

router.post(
	"/",
	validateParams(organizationIdSchema),
	validateBody(createBoardSchema),
	createBoardController,
);

router.get(
	"/",
	validateParams(organizationIdSchema),
	getBoardsController,
);

router.get(
	"/:boardId",
	validateParams(organizationBoardIdSchema),
	getBoardByIdController,
);

router.patch(
	"/:boardId",
	validateParams(organizationBoardIdSchema),
	validateBody(updateBoardSchema),
	updateBoardController,
);

router.delete(
	"/:boardId",
	validateParams(organizationBoardIdSchema),
	deleteBoardController,
);

export default router;
