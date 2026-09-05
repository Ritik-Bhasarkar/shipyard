import type { ErrorRequestHandler, RequestHandler } from "express";

type DatabaseError = { code?: unknown; meta?: { target?: unknown } };

export const notFoundHandler: RequestHandler = (_req, res) => {
    res.status(404).json({ message: "Route not found" });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    console.error(error);

    const databaseError = error as DatabaseError;
    if (databaseError?.code === "P2002") {
        return res.status(409).json({
            message: "A record with these values already exists",
            target: databaseError.meta?.target,
        });
    }
    if (databaseError?.code === "P2025") {
        return res.status(404).json({ message: "Record not found" });
    }

    return res.status(500).json({ message: "Internal server error" });
};
