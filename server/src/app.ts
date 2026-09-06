import authRoutes from "./routes/authRoutes";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false
});

app.use("/api", apiLimiter);

app.use(
  "/api/auth",
  authRoutes
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CivicFix API is running",
    timestamp: new Date().toISOString()
  });
});

export default app;