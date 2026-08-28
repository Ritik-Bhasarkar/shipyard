import { Router } from "express";
import { createOrganizationController,
        getOrganizationsController,
        getOrganizationByIdController,
        deleteOrganizationController
} from "../controllers/organization.controller";

const router = Router();

router.post('/', createOrganizationController);
router.post('/', getOrganizationsController);
router.get('/:orgId', getOrganizationByIdController);
router.delete(':/orgId', deleteOrganizationController);

export default router;
