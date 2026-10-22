const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const responseHandler = {
  success: (res, message, data = null) => {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message,
      data,
    });
  },
  created: (res, message, data) => {
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message,
      data,
    });
  },
  error: (res, message = "Something went wrong", statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  },
  badRequest: (res, message = "Bad request") => {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message,
    });
  },
  unauthorized: (res, message = "Unauthorized access") => {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message,
    });
  },
  notFound: (res, message = "Resource not found") => {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message,
    });
  },
  internalServerError: (res, error) => {
    console.error("Internal Server Error:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An internal server error occurred",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  },
};

export default responseHandler;
