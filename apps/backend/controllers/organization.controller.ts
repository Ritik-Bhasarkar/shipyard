import type { Request, Response } from "express";
import {
	createOrganization,
	getOrganizations,
	getOrganizationById,
	deleteOrganization,
} from "../services/organization.service";

export async function createOrganizationController(
	req: Request,
	res: Response,
) {
	const { orgName, orgDescription } = req.body;
	return res
		.status(201)
		.json(await createOrganization(orgName, orgDescription));
}

export async function getOrganizationsController(req: Request, res: Response) {
	return res.status(200).json(await getOrganizations());
}

export async function getOrganizationByIdController(
	req: Request,
	res: Response,
) {
	const orgId = req.params.orgId as string;
	const organization = await getOrganizationById(orgId);
	if (!organization)
		return res.status(404).json({ message: "Organization not found" });
	return res.status(200).json(organization);
}

export async function deleteOrganizationController(
	req: Request,
	res: Response,
) {
	const orgId = req.params.orgId as string;
	const organization = await deleteOrganization(orgId);
	return res
		.status(200)
		.json({ message: "Organization deleted successfully", organization });
}
