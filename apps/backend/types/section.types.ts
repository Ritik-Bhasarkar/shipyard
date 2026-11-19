interface Section {
	orgId: string;
	boardId: string;
	sectionId: string;
	sectionTitle: string;
}

export interface CreateSectionParams extends Omit<
	Section,
	"sectionId"
> {}

export interface GetSectionsParams extends Pick<Section, "boardId" | "orgId"> {}

export interface GetSectionByIdParams extends Omit<Section, "sectionTitle"> {}

export interface UpdateSectionParams
	extends
		Pick<Section, "sectionId" | "boardId" | "orgId">,
		Partial<Pick<Section, "sectionTitle">> {}

export interface DeleteSectionParams extends Omit<Section, "sectionTitle"> {}
