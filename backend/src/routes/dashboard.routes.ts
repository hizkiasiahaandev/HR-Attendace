import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { dashboardController } from "../controllers/dashboard.controller";


const router = Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    dashboardController.getSummary
);



export default router;