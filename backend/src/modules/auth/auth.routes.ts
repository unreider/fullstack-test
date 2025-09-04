import { Router } from "express";
import { login, register } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { registerSchema, loginSchema } from "./auth.schemas";

const r = Router();
r.post("/register", validate(registerSchema), register);
r.post("/login", validate(loginSchema), login);
export default r;
