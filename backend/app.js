import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

dotenv.config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set

connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://expensesage.vercel.app", // Allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

