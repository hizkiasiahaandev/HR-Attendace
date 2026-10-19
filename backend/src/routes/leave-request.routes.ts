import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { leaveRequestController } from "../controllers/leave-request.controller";

const router = Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    leaveRequestController.create
);

router.get(
    "/my",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    leaveRequestController.getMy
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    leaveRequestController.getAll
);

router.patch(
    "/:id/approve",
    authMiddleware,
    roleMiddleware("ADMIN"),
    leaveRequestController.approve
);


router.patch(
    "/:id/reject",
    authMiddleware,
    roleMiddleware("ADMIN"),
    leaveRequestController.reject
);





export default router;