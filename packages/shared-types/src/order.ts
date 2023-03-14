export interface ShippingInfo {
  address: string;
  city: string;
  phoneNo: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface OrderItem<T = string> {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: T;
}

export interface PaymentInfo {
  id: string;
}

export interface Order<T = string> {
  _id: string;
  __v: string;
  shippingInfo: ShippingInfo;
  user: T;
  orderItems: OrderItem<T>[];
  paymentInfo: PaymentInfo;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  orderStatus: 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'canceled';
  deliveredAt: string;
}
