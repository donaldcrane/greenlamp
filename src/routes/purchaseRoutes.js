import { Router } from "express";
import AdminPurchasesController from "../controllers/purchases";
import PaymentController from "../controllers/payment";
import Authentication from "../middleware/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  getAllPurchases, getPurchase, deletepurchase
} = AdminPurchasesController;
const {
  initialize, verify
} = PaymentController;

router.get("/purchases", getAllPurchases);
router.get("/purchase/:id", getPurchase);
router.get("/paystack/verify", verify);

router.post("/paystack/initialize/:id", verifyToken, initialize);
router.delete("/admin/weed/:id", verifyToken, deletepurchase);

export default router;
