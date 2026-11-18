import Board from "@/_components/board/board";
import { ROOT_URL } from "@/root.url";

interface BoardPageProps {
	params: Promise<{
		orgId: string;
		boardId: string;
	}>;
}

const BoardPage = async ({ params }: BoardPageProps) => {
	const { orgId, boardId } = await params;

	const response = await fetch(
		`${ROOT_URL}/organizations/${orgId}/boards/${boardId}`,
		{
			cache: "no-store",
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch board");
	}

	const data = await response.json();

	return <Board board={data} />;
};

export default BoardPage;
