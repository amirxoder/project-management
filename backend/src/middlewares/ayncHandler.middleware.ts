import { NextFunction, Request, Response } from "express";

type AsyncHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (handler: AsyncHandlerMiddleware): AsyncHandlerMiddleware =>
  async (request, response, next) => {
    try {
      await handler(request, response, next);
    } catch (error) {
      console.error(`Error occurred on path ${request.path}:`, error);
      next(error);
    }
  };
