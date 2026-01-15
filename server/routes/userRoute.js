import express from "express";
import { register, login, isAuth, logout } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/is-auth", authUser, isAuth);   // ✅ THIS WAS MISSING
router.get("/logout", authUser, logout);

export default router;
