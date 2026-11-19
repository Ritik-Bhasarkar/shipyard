"use client";

import { useState, useEffect } from "react";
import type { Board } from "@/lib/api/boards.api";
import {
	getSections,
	createSection,
	type Section,
} from "@/lib/api/sections.api";

const Board = ({ board }: { board: Board }) => {
	const [sectionTitle, setSectionTitle] = useState("");
	const [sections, setSections] = useState<Section[]>([]);

	useEffect(() => {
		const loadSections = async () => {
			try {
				const data = await getSections(board.orgId, board.boardId);
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
			const newSection = await createSection(
				board.orgId,
				board.boardId,
				trimmedName,
			);
			setSectionTitle("");
			setSections((prev) => [...prev, newSection]);
		} catch (error) {
			console.log("Couldn't create section", error);
		}
	};

	console.log("section", sections);
	console.log("section-title", sectionTitle);

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
					{sections.map((section) => {
						return <li key={section.sectionId}>{sectionTitle}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default Board;
