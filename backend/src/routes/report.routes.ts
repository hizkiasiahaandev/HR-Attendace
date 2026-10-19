import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { reportController } from "../controllers/report.controller";

const router = Router();

router.get(
    "/attendance",
    authMiddleware,
    roleMiddleware("ADMIN"),
    reportController.downloadAttendanceReport
);

export default router;