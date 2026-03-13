import { Schema, model } from 'mongoose';

const iceCreamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [40, 'Name cannot contain more than 40 characters.'],
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      max: [1000, 'Ice cream price cannot be more than 1000.'],
      min: [0, 'Price cannot be in negative.'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be in negative.'],
    },
    discount: {
      type: Number,
      max: [100, 'Discount cannot be more than 100.'],
      min: [0, 'Discount cannot be in negative.'],
      default: 0,
    },
    image: {
      type: String,
      match: [/^(https?):\/\/[^ "]+$/, 'Invalid image url.'],
      default: 'https://placehold.co/400',
    },
  },
  { timestamps: true },
);

const IceCream = model('IceCream', iceCreamSchema);
export default IceCream;
