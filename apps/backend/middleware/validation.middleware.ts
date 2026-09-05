import type { RequestHandler } from "express";
import type { ZodType } from "zod";

type ValidationSource = "body" | "params";

export function validate(
    schema: ZodType,
    source: ValidationSource = "body",
): RequestHandler {
    return (req, res, next) => {
        const value = source === "body" ? req.body : req.params;
        const result = schema.safeParse(value);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues,
            });
        }

        if (source === "body") {
            req.body = result.data;
        } else {
            req.params = result.data as typeof req.params;
        }

        return next();
    };
}

export const validateBody = (schema: ZodType): RequestHandler =>
    validate(schema, "body");

export const validateParams = (schema: ZodType): RequestHandler =>
    validate(schema, "params");
