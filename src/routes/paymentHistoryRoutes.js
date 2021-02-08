import { Router } from "express";
import AdminPaymentHistoryController from "../controllers/paymentHistory";
import Authentication from "../middleware/authenticate";

const router = Router();
const { verifyToken, verifyUserById } = Authentication;
const { getAllPaymentHistories, getPaymentHistory } = AdminPaymentHistoryController;

router.get("/payment/history", verifyToken, verifyUserById, getAllPaymentHistories,);
router.get("/payment/history/:id", verifyToken, verifyUserById, getPaymentHistory);

export default router;
