import express from "express";
import { LoginPage, signupPage } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signupPage);
router.post("/login", LoginPage);

export default router; 
