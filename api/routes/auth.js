import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

router.post('/login', login)
router.post('/register', register)

export default router;