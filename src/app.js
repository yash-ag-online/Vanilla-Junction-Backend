import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { ApiError, ApiResponse, asyncHandler, envValues } from './utils.js';
import { statusCodes } from './constants.js';
import { connectToMongoDB } from './db.js';

const app = express();

// MongoDB Connection
await connectToMongoDB();

// Common Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms`),
);
app.use(
  cors({
    origin: envValues.origins,
    methods: ['POST', 'GET', 'PATCH', 'OPTION', 'PUT'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  }),
);

// Routes
app.get(
  '/health-check',
  asyncHandler((req, res) => {
    return res
      .status(statusCodes.OK)
      .json(new ApiResponse(statusCodes.OK, 'Health Ok!', null));
  }),
);

// Not-Found Handler
app.use(
  asyncHandler((req, res) => {
    return res
      .status(statusCodes.NOT_FOUND)
      .json(new ApiResponse(statusCodes.NOT_FOUND, 'Route Not Found!', null));
  }),
);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiError(err.statusCode, err.message, err.error));
  }

  if (err instanceof Error) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(new ApiError(statusCodes.INTERNAL_SERVER_ERROR, err.message, null));
  }

  return res
    .status(statusCodes.INTERNAL_SERVER_ERROR)
    .json(
      new ApiError(
        statusCodes.INTERNAL_SERVER_ERROR,
        'Something Went Wrong!',
        null,
      ),
    );
});

export default app;
