import { Product, Review, Order, OrderItem, AddressItem } from 'shared-types';

import { axiosInstance } from './axiosInstance';
import { IProduct } from '@store/cart';

export interface IGetProductsRes {
  success: boolean;
  products: Product[];
}

export const getProducts = async (): Promise<IGetProductsRes> => {
  const res = await axiosInstance.get('/products');
  const data = await res.data;
  return data;
};

export interface IGetProductRes {
  success: boolean;
  product: Product;
}

export const getProduct = async (productId: string): Promise<IGetProductRes> => {
  const res = await axiosInstance.get(`/product/${productId}`);
  const data = await res.data;
  return data;
};

export interface IGetReviewsRes {
  success: boolean;
  reviews: Review[];
}

export const getReviews = async (productId: string): Promise<IGetReviewsRes> => {
  const res = await axiosInstance.get(`product/reviews`, {
    params: { productId },
  });
  const data = await res.data;
  return data;
};

export interface IAddReview {
  productId: string;
  rating: number;
  comment: string;
}

export interface IAddReviewRes {
  success: boolean;
}

export const addReview = async ({
  productId,
  rating,
  comment,
}: IAddReview): Promise<IAddReviewRes> => {
  const res = await axiosInstance.put(
    `/product/review`,
    { productId, rating, comment },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const data = await res.data;
  return data;
};

export interface IDeleteReview {
  productId: string;
  rating: number;
  comment: string;
}

export interface IDeleteReviewRes {
  success: boolean;
}

export const deleteReview = async ({ productId }: IDeleteReview): Promise<IDeleteReviewRes> => {
  const res = await axiosInstance.delete(`/product/review`, {
    params: {
      productId,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};

export interface ICreateOrderRes {
  success: boolean;
  order: Order;
}

export const createOrder = async (
  items: IProduct[],
  orderData: Pick<
    Order,
    'shippingInfo' | 'shippingAmount' | 'totalAmount' | 'taxAmount' | 'paymentInfo'
  >
): Promise<ICreateOrderRes> => {
  const orderItems: Omit<OrderItem, '_id'>[] = items.map(
    ({ name, quantity, photos, price, _id }) => ({
      name,
      quantity: quantity ? quantity : 1,
      image: photos[0].secure_url,
      price,
      product: _id,
    })
  );

  const res = await axiosInstance.post(
    '/order/create',
    { orderItems, ...orderData },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const data = await res.data;
  return data;
};

export interface IGetMyOrdersRes {
  success: boolean;
  orders: Order[];
}

export const getMyOrders = async (): Promise<IGetMyOrdersRes> => {
  const res = await axiosInstance.get('/order/myorder', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};

export interface IGetOrder {
  success: boolean;
  order: Order;
}

export const getOrder = async (orderId: string): Promise<IGetOrder> => {
  const res = await axiosInstance.get(`order/${orderId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = res.data;
  return data;
};

interface addAddressRes {
  success: boolean;
}

export const addAddress = async (address: Omit<AddressItem, '_id'>): Promise<addAddressRes> => {
  const res = await axiosInstance.post('/address/add', address, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};

interface removeAddressRes {
  success: boolean;
}

export const removeAddress = async (addressId: string): Promise<removeAddressRes> => {
  const res = await axiosInstance.delete(`/address/remove/${addressId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};

export const getStripeAPIKey = async (): Promise<{ key: string }> => {
  const res = await axiosInstance.get('/payment/stripekey', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};

export interface ICapturePaymenRes {
  success: boolean;
  client_secret: string;
  amount: number;
}

export const capturePayment = async (amount: number): Promise<ICapturePaymenRes> => {
  const res = await axiosInstance.post(
    '/payment/capturestripe',
    { amount },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const data = await res.data;
  return data;
};
