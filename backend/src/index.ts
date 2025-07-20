import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import appConfig from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/ayncHandler.middleware";

const app = express();
const BASE_PATH = appConfig.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "session",
    keys: [appConfig.SESSION_SECRET],
    maxAge: parseInt(appConfig.SESSION_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000,
    secure: appConfig.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);
app.use(
  cors({
    origin: appConfig.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  `${BASE_PATH}/health`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Uncomment the next line to
    // throw new Error("Simulated error for testing");
    res.status(HTTPSTATUS.OK).json({ message: "Server is healthy" });
  })
);

app.use(errorHandler as NextFunction);

app.listen(appConfig.PORT, async () => {
  console.log(
    `Server listening on port ${appConfig.PORT} in ${appConfig.NODE_ENV} mode`
  );
  await connectDatabase();
});
