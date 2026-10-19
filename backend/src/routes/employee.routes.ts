import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { employeeController } from "../controllers/employee.controller";

const router = Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.paginate
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.create
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.getById
);

router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.update
);

export default router;