import { Request, Response } from "express";
import { prisma } from "../../prisma";
import jwt from "jsonwebtoken";
import { env } from "../../env";

function userId(req: Request) {
	const h = req.headers.authorization;
	if (!h) return null;
	try {
		const [, token] = h.split(" ");
		const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
		return payload.sub;
	} catch {
		return null;
	}
}

export async function createItem(req: Request, res: Response) {
	const uid = userId(req);
	if (!uid) return res.status(401).json({ message: "unauthorized" });
	const { title, notes } = req.body;
	const item = await prisma.item.create({ data: { title, notes, ownerId: uid } });
	res.status(201).json(item);
}

export async function listItems(req: Request, res: Response) {
	const uid = userId(req);
	if (!uid) return res.status(401).json({ message: "unauthorized" });

	// After validate(), these are already numbers — but cast safely anyway.
	const q = (req.query as any).q ?? "";
	const page = Number((req.query as any).page ?? 1) || 1;
	const limit = Math.min(100, Number((req.query as any).limit ?? 10) || 10);

	const where = {
		ownerId: uid,
		...(q ? { title: { contains: String(q), mode: "insensitive" as const } } : {}),
	};

	const [items, total] = await Promise.all([
		prisma.item.findMany({
			where,
			orderBy: { createdAt: "desc" },
			skip: (page - 1) * limit,
			take: limit, // ✅ number, not string
		}),
		prisma.item.count({ where }),
	]);

	res.json({ items, total, page, pages: Math.ceil(total / limit) });
}
