import { Response } from "express";

const extractErrorMessage = (error: any): string => {
  if (!error) return "Unknown error occurred";
  if (typeof error === "string") return error;
  return (
    error.message ||
    error.error?.message ||
    error.errors?.[0]?.message ||
    error.sqlMessage ||
    error.details?.[0]?.message ||
    "Unknown error occurred"
  );
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const responseHandler = {
  success: (res: Response, message: string, data: any = null) => {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message,
      data,
    });
  },
  created: (res: Response, message: string, data: any = null) => {
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message,
      data,
      statusCode: HTTP_STATUS.CREATED,
    });
  },
  noContent: (res: Response) => res.status(HTTP_STATUS.NO_CONTENT).send(),
  error: (res: Response, message: string, statusCode: number = 400) => {
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  },
  badRequest: (res: Response, message: string = "Bad Request") => {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message,
      statusCode: HTTP_STATUS.BAD_REQUEST,
    });
  },
  unauthorized: (res: Response, message: string = "Unauthorized") => {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    });
  },
  forbidden: (res: Response, message: string = "Forbidden") => {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message,
      statusCode: HTTP_STATUS.FORBIDDEN,
    });
  },
  notFound: (res: Response, message: string = "Not Found") => {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message,
      statusCode: HTTP_STATUS.NOT_FOUND,
    });
  },
  internalServerError: (res: Response, error: any = null) => {
    const message = extractErrorMessage(error);
    console.error("Internal Server Error:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: message || "Internal Server Error",
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  },
};

export default responseHandler;
