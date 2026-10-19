import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { attendanceController } from "../controllers/attendance.controller";

const router = Router();

router.post(
    "/check-in",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    attendanceController.checkIn
);

router.patch(
    "/check-out",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    attendanceController.checkOut
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    attendanceController.getAll     
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    attendanceController.getMy
);

router.post(
    "/check-attendance",
    authMiddleware,
    roleMiddleware("ADMIN"),
    attendanceController.checkAttendance
);


export default router;