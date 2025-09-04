import { Router } from "express";
import { createItem, listItems } from "./items.controller";
import { validate } from "../../middleware/validate";
import { createItemSchema, listQuerySchema } from "./items.schemas";
const r = Router();
r.get("/", validate(listQuerySchema), listItems);
r.post("/", validate(createItemSchema), createItem);
export default r;
