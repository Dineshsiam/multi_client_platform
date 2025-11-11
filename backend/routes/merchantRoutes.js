import express from "express";
import { addMessage, getMessages } from "../controllers/merchantController.js";
const router = express.Router();

router.post("/", addMessage);
router.get("/:userId", getMessages);

export default router;
