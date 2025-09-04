import { z } from "zod";

export const createItemSchema = z.object({
	body: z.object({
		title: z.string().min(1),
		notes: z.string().optional(),
	}),
});

export const listQuerySchema = z.object({
	query: z.object({
		q: z.string().optional().default(""),
		page: z.coerce.number().int().min(1).default(1),
		limit: z.coerce.number().int().min(1).max(100).default(10),
	}),
});
