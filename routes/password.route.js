import express from "express";
import {
  request_password_reset,
  reset_password,
} from "../controllers/password.controller.js";


const router = express.Router();

router.post("/request-password-reset", request_password_reset);
router.post("/reset-password", reset_password);


export default router;
