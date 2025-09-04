// backend/src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { Prisma } from "@prisma/client";

export async function register(req: Request, res: Response) {
	let { email, password } = req.body as { email?: string; password?: string };
	if (!email || !password) return res.status(400).json({ message: "email & password required" });

	email = email.trim().toLowerCase();
	const hash = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({ data: { email, password: hash } });
		return res.status(201).json({ id: user.id, email: user.email });
	} catch (err: any) {
		// Only treat real unique index violations as 409
		if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
			return res.status(409).json({ message: "email exists" });
		}
		console.error("register error:", err);
		return res.status(500).json({ message: "internal error" });
	}
}

export async function login(req: Request, res: Response) {
	let { email, password } = req.body as { email?: string; password?: string };
	if (!email || !password) return res.status(400).json({ message: "email & password required" });

	email = email.trim().toLowerCase();
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return res.status(401).json({ message: "invalid credentials" });

	const ok = await bcrypt.compare(password, user.password);
	if (!ok) return res.status(401).json({ message: "invalid credentials" });

	const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: "1d" });
	res.json({ token });
}
