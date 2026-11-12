
import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodType): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    req.body = result.data;

    next();
  };
};
