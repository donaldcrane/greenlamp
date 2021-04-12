import { Router } from "express";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import resetPassword from "./resetPassword";
import weedRoutes from "./weedRoutes";
import purchaseRoutes from "./purchaseRoutes";
import paymentHistoryRoutes from "./paymentHistoryRoutes";

const router = new Router();

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/", resetPassword);
router.use("/", weedRoutes);
router.use("/", purchaseRoutes);
router.use("/", paymentHistoryRoutes);

export default router;
