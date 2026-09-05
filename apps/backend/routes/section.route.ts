import { Router } from "express";
import {
    createSectionSchema,
    sectionIdSchema,
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

const router = Router();

router.post("/", validateBody(createSectionSchema), createSectionController);

router.get("/", getSectionsController);

router.get(
    "/:sectionId",
    validateParams(sectionIdSchema),
    getSectionByIdController,
);

router.patch(
    "/:sectionId",
    validateParams(sectionIdSchema),
    validateBody(updateSectionSchema),
    updateSectionController,
);

router.delete(
    "/:sectionId",
    validateParams(sectionIdSchema),
    deleteSectionController,
);

export default router;
