import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['Pending', 'Success', 'Fail'],
      required: true,
      default: 'Pending',
    },
    amount: {
      type: Number,
      required: true,
      max: [100000, 'Amount cannot be more than 100000.'],
      min: [0, 'Amount cannot be in negative.'],
    },
    transactionId: {
      type: String,
      required: true,
    },
    payeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
  },
  { timestamps: true },
);

const Payment = model('Payment', paymentSchema);
export default Payment;
