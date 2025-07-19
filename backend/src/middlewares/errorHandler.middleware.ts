import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
): any => {
  console.error(`Error occurred on path ${request.path}:`, error);

  if (error instanceof SyntaxError) {
    return response.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  return response.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Internal Server Error",
    error: error.message || "An unexpected error occurred",
  });
};
