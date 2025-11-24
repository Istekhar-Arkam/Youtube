import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // uses of app.use ,when u wanted to do the middleware or configuration setting
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser()); // it is used to access cookies of user and also to set cookies from my server and perform curd operation
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // its used to take data which comes in url encoded form
app.use(express.static("public")); // it is use to store file,folder,image

// route import

import userRouter from "./routes/user.routes.js";

// route declaration

app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register

export { app };
