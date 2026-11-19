"use client";

import {
	createBoard,
	deleteBoard,
	fetchBoards,
	type Board,
} from "@/lib/api/boards.api";
import { ROOT_URL } from "@/root.url";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Organization {
	orgId: string;
	orgName: string;
	orgDescription: string | null;
	boards: Board[];
}

export interface DashboardProps {
	organization: Organization;
}

const Dashboard = ({ organization }: DashboardProps) => {
	const [boards, setBoards] = useState<Board[]>([]);
	const [boardName, setBoardName] = useState("");
	const router = useRouter();

	useEffect(() => {
		const loadFetch = async () => {
			try {
				const data = await fetchBoards(organization.orgId);
				setBoards(data);
			} catch (error) {
				console.log("Failed to Load Boards", error);
			}
		};
		loadFetch();
	}, [organization.orgId]);

	const handleCreateBoard = async () => {
		const trimmedName = boardName.trim();

		if (!trimmedName) return;

		try {
			const newBoards = await createBoard(
				organization.orgId,
				trimmedName,
			);

			setBoardName("");

			setBoards((prev) => [...prev, newBoards]);
		} catch (error) {
			console.error("Couldn't create board", error);
		}
	};

	const handleDeleteBoard = async (boardId: string) => {
		try {
			await deleteBoard(organization.orgId, boardId);

			setBoards(await fetchBoards(organization.orgId));
		} catch (error) {
			console.error("Couldn't delete board", error);
		}
	};

	const RenameBoard = async (boardId: string, boardName: string) => {
		try {
			const response = await fetch(
				`${ROOT_URL}/organizations/${organization.orgId}/boards/${boardId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						boardName: boardName,
					}),
				},
			);
			if (!response.ok) {
				throw new Error("Failed to rename Board");
			}

			setBoards(await fetchBoards(organization.orgId));
		} catch (error) {
			console.error("Failed to rename Board", error);
		}
	};

	return (
		<div>
			<div>
				<span>Organization: {organization.orgName}</span>
				<p>{organization.orgDescription}</p>
			</div>

			<div>
				<h2>Boards</h2>

				<input
					type="text"
					value={boardName}
					onChange={(event) => setBoardName(event.target.value)}
					placeholder="Board name"
				/>

				<button onClick={handleCreateBoard}>Create Board</button>

				{boards.map((board) => (
					<div key={board.boardId}>
						<div
							style={{ cursor: "pointer" }}
							role="button"

							onClick={() =>
								router.push(
									`/o/${organization.orgId}/b/${board.boardId}`,
								)
							}>
							{board.boardName}
						</div>

						<button
							onClick={() => handleDeleteBoard(board.boardId)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
