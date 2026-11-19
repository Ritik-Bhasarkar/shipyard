interface Boards {
	orgId: string;
	boardId: string;
	boardName: string;
}

export interface CreateBoardParams extends Omit<Boards, "boardId"> {}

export interface GetBoardsParams extends Pick<Boards, "orgId"> {}

export interface GetBoardbyIdParams extends Pick<Boards, "boardId"> {}

export interface UpdateBoardParams
	extends Pick<Boards, "boardId">, Partial<Pick<Boards, "boardName">> {}
	
export interface DeleteBoardParams extends Pick<Boards, "boardId"> {}
