import express from "express";
import cors from "cors";
import coockieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(coockieParser());

// Import routes

import userRouter from "./routes/user.routes.js";
import filterRouter from "./routes/filter.routes.js";
import ratingRouter from "./routes/rating.routes.js";
import storeRouter from "./routes/store.routes.js";

// Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/filter", filterRouter);
app.use("/api/v1/rating", ratingRouter);
app.use("/api/v1/store", storeRouter);

app.use(errorHandler);
export { app };
