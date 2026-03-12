import { model, Schema } from 'mongoose';
import { envValues, phoneNumberSchema } from '../utils.js';
import jwt from 'jsonwebtoken';

const customerSchema = new Schema(
  {
    phoneNumber: {
      type: phoneNumberSchema,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
      unique: true,
      expires: 7 * 86400,
    },
    otp: {
      type: String,
      maxLength: 6,
      minLength: 6,
      expires: 300,
      lowercase: true,
      select: false,
    },
    savedAddress: {
      type: new Schema({
        street: new Schema({
          streetNum: String,
          streetName: String,
          houseNum: String,
        }),
        city: String,
        state: String,
        zipCode: Number,
      }),
      default: null,
    },
  },
  { timestamps: true },
);

customerSchema.methods.getNewTokens = function () {
  const newRefreshToken = jwt.sign(
    { _id: this._id },
    envValues.referesh_token_secret,
    { expiresIn: '7d' },
  );
  const newAccessToken = jwt.sign(
    { _id: this._id },
    envValues.access_token_secret,
    { expiresIn: '15m' },
  );

  this.refreshToken = newRefreshToken;
  this.save({ validateBeforeSave: false });

  return {
    newRefreshToken,
    newAccessToken,
  };
};

customerSchema.methods.generateLoginOtp = function () {
  const min = 100000;
  const max = 999999;

  const array = new Uint32Array(1);

  window.crypto.getRandomValues(array);

  const randomValue = array[0];

  const range = max - min + 1;
  const scaledRandom = (randomValue % range) + min; // OTP

  this.otp = scaledRandom;
  this.save({ validateBeforeSave: false });

  return scaledRandom;
};

const Customer = model('Customer', customerSchema);

export default Customer;
