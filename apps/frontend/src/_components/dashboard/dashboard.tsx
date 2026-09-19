"use client";

import { ROOT_URL } from "@/root.url";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Board {
	boardId: string;
	boardName: string;
	orgId: string;
}

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

	const fetchBoards = async (orgId: string): Promise<Board[]> => {
		const response = await fetch(
			`${ROOT_URL}/organizations/${orgId}/boards`,
		);

		if (!response.ok) {
			throw new Error("Failed to fetch boards");
		}

		const data = await response.json();
		return data ?? [];
	};

	useEffect(() => {
		const loadBoards = async () => {
			try {
				const data = await fetchBoards(organization.orgId);
				setBoards(data);
			} catch (error) {
				console.error("Couldn't get boards", error);
			}
		};
		loadBoards();
	}, [organization.orgId]);

	const createBoard = async () => {
		const trimmedName = boardName.trim();

		if (!trimmedName) return;

		try {
			const response = await fetch(
				`${ROOT_URL}/organizations/${organization.orgId}/boards`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						boardName: trimmedName,
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Failed to create board");
			}

			setBoardName("");

			await fetchBoards(organization.orgId);
		} catch (error) {
			console.error("Couldn't create board", error);
		}
	};

	const router = useRouter();

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

				<button onClick={createBoard}>Create Board</button>

				{boards.map((board) => (
					<div
						style={{ cursor: "pointer" }}
						role="button"
						key={board.boardId}
						onClick={() =>
							router.push(
								`/o/${organization.orgId}/b/${board.boardId}`,
							)
						}>
						{board.boardName}
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
