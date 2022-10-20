import { Types } from 'mongoose';

export interface ShippingInfo {
  address: string;
  city: string;
  phoneNo: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: Types.ObjectId;
}

export type PaymentInfo = {
  id: string;
};

export type Order = {
  shippingInfo: ShippingInfo;
  user: Types.ObjectId;
  orderItems: OrderItem[];
  paymentInfo: PaymentInfo;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  orderStatus: 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'canceled';
  deliveredAt: DateConstructor;
};
