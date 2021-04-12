import { Router } from "express";
import AdminPurchasesController from "../controllers/purchases";
import PaymentController from "../controllers/payment";
import Authentication from "../middleware/authenticate";

const router = Router();
const { verifyToken, verifyAdmin, verifyUserById } = Authentication;
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
router.delete("/admin/purchase/:id", verifyToken, verifyUserById, verifyAdmin, deletepurchase);

export default router;
