import DateConstructor from 'mongoose';

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
  product: any;
}

export type PaymentInfo = {
  id: string;
};

export type Order = {
  shippingInfo: ShippingInfo;
  user: object;
  orderItems: OrderItem[];
  paymentInfo: PaymentInfo;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  orderStatus: string;
  deliveredAt: DateConstructor;
};
