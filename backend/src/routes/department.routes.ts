import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { departmentController } from "../controllers/department.controller";

const router = Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.create
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.getById
);

router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.update
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.delete
);

export default router;