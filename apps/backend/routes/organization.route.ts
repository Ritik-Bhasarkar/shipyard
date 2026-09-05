import { Router } from "express";
import { createOrganizationSchema, organizationIdSchema } from "validation";
import {
    createOrganizationController,
    getOrganizationsController,
    getOrganizationByIdController,
    deleteOrganizationController,
} from "../controllers/organization.controller";
import {
    validateBody,
    validateParams,
} from "../middleware/validation.middleware";

const router = Router();

router.post(
    "/",
    validateBody(createOrganizationSchema),
    createOrganizationController,
);

router.get("/", getOrganizationsController);

router.get(
    "/:orgId",
    validateParams(organizationIdSchema),
    getOrganizationByIdController,
);

router.delete(
    "/:orgId",
    validateParams(organizationIdSchema),
    deleteOrganizationController,
);

export default router;
