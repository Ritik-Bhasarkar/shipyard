interface Organization {
	orgId: string;
	orgName: string;
	orgDescription?: string;
}

export interface CreateOrganizationParams extends Omit<Organization, "orgId"> {}

export interface GetOrganizationByIdParams extends Pick<
	Organization,
	"orgId"
> {}

export interface DeleteOrganizationParams extends Pick<Organization, "orgId"> {}
