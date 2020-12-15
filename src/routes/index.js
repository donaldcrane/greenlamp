import { Router } from "express";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import resetPassword from "./resetPassword";

const router = new Router();

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/", resetPassword);

export default router;
