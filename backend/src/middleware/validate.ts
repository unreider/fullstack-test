import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
	const parsed = schema.safeParse({
		body: req.body,
		query: req.query,
		params: req.params,
	});

	if (!parsed.success) {
		return res.status(400).json({ errors: parsed.error.flatten() });
	}

	// ⬇️ Apply Zod transforms/coercions back onto the req
	const { body, query, params } = parsed.data as any;
	if (body) (req as any).body = body;
	if (query) (req as any).query = query;
	if (params) (req as any).params = params;

	next();
};
