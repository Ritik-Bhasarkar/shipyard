import express from "express";
import organizationRoutes from "./routes/organization.route";
import boardRoutes from "./routes/board.route";
import sectionRoutes from "./routes/section.route";
import issueRoutes from "./routes/issue.route";
import commentRoutes from "./routes/comment.route";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";

const app = express();

app.use(express.json());

app.use("/organizations", organizationRoutes);
app.use("/boards", boardRoutes);
app.use("/sections", sectionRoutes);
app.use("/issues", issueRoutes);
app.use("/comments", commentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
