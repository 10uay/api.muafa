import express from "express";
import { sms_notification } from "../controllers/sms.controller.js";

const router = express.Router();

router.post("/notification", sms_notification);

export default router;
