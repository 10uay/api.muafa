import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.route.js";
import smsRoutes from "./routes/sms.route.js";
import passwordRoutes from "./routes/password.route.js";
import cookieParser from "cookie-parser";
// import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// const __dirname = path.resolve();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// app.use("/", (req, res) => res.json("Server is working..."));

app.use("/api/user", userRoutes);

app.post("/api/sms", smsRoutes);

app.post("/api/password", passwordRoutes);


app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
