import { Router } from "express";
import {
  createSectionSchema,
  organizationBoardIdSchema,
  organizationBoardSectionIdSchema,
  updateSectionSchema,
} from "validation";
import {
  createSectionController,
  getSectionsController,
  getSectionByIdController,
  updateSectionController,
  deleteSectionController,
} from "../controllers/section.controller";
import {
  validateBody,
  validateParams,
} from "../middleware/validation.middleware";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validateParams(organizationBoardIdSchema),
  validateBody(createSectionSchema),
  createSectionController,
);

router.get(
  "/",
  validateParams(organizationBoardIdSchema),
  getSectionsController,
);

router.get(
  "/:sectionId",
  validateParams(organizationBoardSectionIdSchema),
  getSectionByIdController,
);

router.patch(
  "/:sectionId",
  validateParams(organizationBoardSectionIdSchema),
  validateBody(updateSectionSchema),
  updateSectionController,
);

router.delete(
  "/:sectionId",
  validateParams(organizationBoardSectionIdSchema),
  deleteSectionController,
);

export default router;
