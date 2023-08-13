import express from "express";
import { signin, signup } from "../controllers/user.js";
const router = express.Router();
/*Match the request when user sign-in */
router.post("/signin", signin);
/*Match the request when user sign-up for the firts time */
router.post("/signup", signup);

export default router;
