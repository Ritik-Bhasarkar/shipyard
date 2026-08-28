import type { Request, Response } from "express";
import { createOrganization, getOrganizations, getOrganizationById, deleteOrganization } from "../services/organization.service";

export async function createOrganizationController(req: Request, res: Response){
    try{
        const {orgName, orgDescription} = req.body;

        const organization = await createOrganization(
            orgName,
            orgDescription
        )

        return res.status(201).json(organization);
    }catch(error){
        return res.status(500).json({
            message:"Failed to create organization",
        })
    }
}


export async function getOrganizationsController(req: Request, res: Response){
    try{
        const organizations = await getOrganizations();
        return res.status(200).json(organizations);
    }catch(error){
        return res.status(500).json({
            message: "Failed to get organizations"
        })
    }
}

export async function getOrganizationByIdController(req: Request, res: Response){
    try{
        const { orgId } = req.params;

            if (!orgId || typeof orgId !== "string") {
                return res.status(400).json({
                message: "Invalid organization ID",
                });
            }

        const organization = await getOrganizationById(orgId);

        if(!organization){
            return res.status(404).json({
                message: "Organization not found"
            })
        }

        return res.status(201).json(organization);
    }catch(error){
        return res.status(500).json({
            message:"Failed to create organization",
        })
    }
}

export async function deleteOrganizationController(
    req: Request,
    res: Response
  ) {
    try {
      const { orgId } = req.params;

        if (!orgId || typeof orgId !== "string") {
            return res.status(400).json({
            message: "Invalid organization ID",
            });
        }
  
      const organization = await deleteOrganization(orgId);
  
      return res.status(200).json({
        message: "Organization deleted successfully",
        organization,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete organization",
      });
    }
  }