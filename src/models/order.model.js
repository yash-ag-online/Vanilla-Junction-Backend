import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
      max: [100000, 'Total price cannot be more than 100000.'],
      min: [0, 'Total price cannot be in negative.'],
    },
    totalDiscount: {
      type: Number,
      required: true,
      max: [100000, 'Total discount cannot be more than 100000.'],
      min: [0, 'Total discount cannot be in negative.'],
    },
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Confirm',
        'Preparing',
        'Out for delivery',
        'Delivered',
        'Canceled',
      ],
      required: true,
      default: 'Pending',
    },
    orderDate: {
      type: Date,
      required: true,
      min: Date.now(),
    },
    deliveryStatus: {
      type: String,
      enum: ['Pending', 'Done', 'Canceled'],
      required: true,
      default: 'Pending',
    },
    deliveryDate: {
      type: Date,
      required: true,
      min: Date.now(),
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    deliveryPersonId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: 'IceCream',
      required: true,
    },
  },
  { timestamps: true },
);

const Order = model('Order', orderSchema);
export default Order;
