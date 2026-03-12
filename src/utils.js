import { Schema } from 'mongoose';

export const envValues = Object.freeze({
  port: Number(process.env.PORT),
  origin: process.env.ORIGINS.toString().split(','),
  node_env: process.env.NODE_ENV.toString(),
  mongodb_uri: process.env.MONGODB_URI.toString(),
  referesh_token_secret: process.env.REFERESH_TOKEN_SECRET.toString(),
  access_token_secret: process.env.ACCESS_TOKEN_SECRET.toString(),
});

export class ApiResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = data;
  }
}

export class ApiError extends Error {
  constructor(statusCode, message, error, stack) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.success = false;
    this.error = error;

    Object.defineProperty(this, 'message', {
      value: message,
      enumerable: true,
      writable: true,
      configurable: true,
    });

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.defineProperty(this, 'stack', {
      value: this.stack,
      enumerable: true,
      writable: true,
      configurable: true,
    });

    if (envValues.node_env !== 'development') this.stack = undefined;
  }
}

export const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const phoneNumberSchema = new Schema({
  countryCode: {
    type: String,
    enum: ['+91'],
    default: '+91',
    required: true,
  },
  number: {
    type: String,
    maxLength: [10, 'Phone number must contain exactly 10 digits'],
    minLength: [10, 'Phone number must contain exactly 10 digits'],
    required: true,
    unique: true,
    match: /^\d+$/,
  },
});
