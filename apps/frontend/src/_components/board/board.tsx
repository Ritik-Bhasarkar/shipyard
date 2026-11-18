import React from "react";
import type { Board } from "@/lib/api/boards.api";

interface BoardProps {
	board: Board;
}

const Board = ({ board }: BoardProps) => {
	return (
		<div>
			<h3>{board.boardName}</h3>
			<span>section making screen</span>
			<div>
				<input
					type="text"
					placeholder="Name section"
					value=""
				/>
				<button>Add Section</button>
			</div>
		</div>
	);
};

export default Board;
