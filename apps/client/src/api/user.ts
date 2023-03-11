import { Product, Review, Order } from 'shared-types';

import { axiosInstance } from './axiosInstance';

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
  order: boolean;
}

export const createOrder = async (orderData: Order): Promise<ICreateOrderRes> => {
  const res = await axiosInstance.post('/order/create', orderData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
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

export const getStripeAPIKey = async (): Promise<{ key: string }> => {
  const res = await axiosInstance.get('/payment/stripekey');
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
