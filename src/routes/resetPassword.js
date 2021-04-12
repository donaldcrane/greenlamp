import { Router } from "express";
import resetPassword from "../controllers/resetPassword";
import Authentication from "../middleware/authenticate";

const { verifyUserByDetails, verifyToken } = Authentication;
const { recover, reset } = resetPassword;

const router = Router();
router.post("/users/recover", verifyUserByDetails, recover);
router.post("/users/reset/:id", verifyToken, reset);
export default router;
