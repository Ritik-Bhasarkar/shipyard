"use client";

import { ROOT_URL } from "@/root.url";
import React, { useEffect, useState } from "react";

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
	const [boards, setBoards] = useState<Board[]>(organization.boards || []);

	useEffect(() => {
		const getBoards = async () => {
			const response = await fetch(
				`${ROOT_URL}/organizations/${organization.orgId}/boards`,
			);
			if (!response.ok) {
				throw Error("Failed to fetch boards");
			}

			const data = response.json();
		};
		getBoards();
	}, []);

	return (
		<div>
			<div>
				<span>organization: {organization.orgName}</span>
				<p>{organization.orgDescription}</p>
			</div>
			<div>boards:</div>
		</div>
	);
};

export default Dashboard;
