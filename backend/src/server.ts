import express, { type Request, type Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import departmentRoutes from "./routes/department.routes";
import attendanceRoutes from "./routes/attendance.routes";
import leaveRequestRoutes from "./routes/leave-request.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import reportRoutes from "./routes/report.routes";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/leave-requests", leaveRequestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);


app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Attendify API is running",
  });
});

export default app;