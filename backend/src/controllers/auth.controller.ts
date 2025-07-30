import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/ayncHandler.middleware";
import appConfig from "../config/app.config";

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const currentWorkspace = req.user?.currentWorkspace;

    if (!currentWorkspace)
      res.redirect(`${appConfig.FRONTEND_GOOGLE_CALLBACK_URL}/status=failure`);

    res.redirect(`${appConfig.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
  }
);
