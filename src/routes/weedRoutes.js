import { Router } from "express";
import AdminWeedController from "../controllers/weed";
import Authentication from "../middleware/authenticate";

const router = Router();
const { verifyToken, verifyUserById, verifyAdmin } = Authentication;
const {
  addWeed, getAllWeeds, getWeed, deleteweed, updateWeed
} = AdminWeedController;

router.get("/weeds", getAllWeeds);
router.get("/weed/:id", getWeed);

router.post("/admin/weed", verifyToken, verifyUserById, verifyAdmin, addWeed);
router.patch("/admin/weed/:id", verifyToken, verifyUserById, verifyAdmin, updateWeed);
router.delete("/admin/weed/:id", verifyToken, verifyUserById, verifyAdmin, deleteweed);

export default router;
