import express from "express";
import cors from "cors";
import { env } from "./env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import itemRoutes from "./modules/items/items.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use((err: any, _req: any, res: any, _next: any) => {
	console.error(err);
	res.status(500).json({ message: "internal error" });
});

app.listen(env.PORT, () => console.log(`API on http://localhost:${env.PORT}`));
