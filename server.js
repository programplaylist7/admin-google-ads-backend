import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/adminRoutes.js";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { Admin } from "./models/admin.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/test", (req, res) => {
  res.json({
    message: "everything working fine",
  });
});

// routes
app.use("/api/admin", router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

import serverlessExpress from "@vendia/serverless-express";
export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; // IMPORTANT

  await connectDB();

  const serverlessApp = serverlessExpress({ app });
  return serverlessApp(event, context);
};