import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.post(
    "/login", 
    authController.login
);

router.get(
    "/me",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    authController.getMe
);

router.patch(
    "/change-password",
    authMiddleware,
    authController.changePassword
);

router.get(
    "/me/admin",
    authMiddleware,
    roleMiddleware("ADMIN"),
    authController.getMeAdmin
);


export default router;