import express from "express";
import { sendMessage, subscribeNewsletter } from "../controllers/contactController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.post("/subscribe", subscribeNewsletter);

export default router;
