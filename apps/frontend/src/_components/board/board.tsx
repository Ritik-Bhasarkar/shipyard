"use client";

import { useState, useEffect } from "react";
import { deleteBoard, type Board } from "@/lib/api/boards.api";
import {
	getSections,
	createSection,
	type Section,
	deleteSectionById,
} from "@/lib/api/sections.api";

const Board = ({ board }: { board: Board }) => {
	const [sectionTitle, setSectionTitle] = useState("");
	const [sections, setSections] = useState<Section[]>([]);

	useEffect(() => {
		const loadSections = async () => {
			try {
				const data = await getSections({
					orgId: board.orgId,
					boardId: board.boardId,
				});

				setSections(data);
			} catch (error) {
				console.log("Failed to load sections", error);
			}
		};

		loadSections();
	}, [board.boardId, board.orgId]);

	const handleCreateSection = async () => {
		const trimmedName = sectionTitle.trim();

		if (!trimmedName) return;

		try {
			const newSection = await createSection({
				orgId: board.orgId,
				boardId: board.boardId,
				sectionTitle: trimmedName,
			});

			setSectionTitle("");
			setSections((prev) => [...prev, newSection]);
		} catch (error) {
			console.log("Couldn't create section", error);
		}
	};

	const handleDeleteSection = async (id: string) => {
		try {
			await deleteSectionById({
				orgId: board.orgId,
				boardId: board.boardId,
				sectionId: id,
			});

			setSections((prev) =>
				prev.filter((section) => section.sectionId !== id),
			);
		} catch (error) {
			console.log("Couldn't delete the section", error);
		}
	};

	return (
		<div>
			<h3>{board.boardName}</h3>
			<span>section making screen</span>

			<div>
				<input
					type="text"
					placeholder="Name section"
					value={sectionTitle}
					onChange={(e) => setSectionTitle(e.target.value)}
				/>
				<button onClick={handleCreateSection}>Add Section</button>
			</div>

			<div>
				<ul>
					{sections.map((section) => (
						<li key={section.sectionId}>
							{section.sectionTitle}
							<button
								onClick={() =>
									handleDeleteSection(section.sectionId)
								}>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Board;
