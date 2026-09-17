import express from "express";
import organizationRoutes from "./routes/organization.route";
import boardRoutes from "./routes/board.route";
import sectionRoutes from "./routes/section.route";
import issueRoutes from "./routes/issue.route";
import commentRoutes from "./routes/comment.route";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		return res.sendStatus(204);
	}

	next();
});

app.use("/organization", organizationRoutes);
app.use("/organizations/:orgId/boards", boardRoutes);
app.use("/organizations/:orgId/boards/:boardId/sections", sectionRoutes);
app.use("/organizations/:orgId/boards/:boardId/issues", issueRoutes);
app.use(
	"/organizations/:orgId/boards/:boardId/issues/:issueId/comments",
	commentRoutes,
);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(Bun.env.PORT ?? 3001);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
