import { Types } from 'mongoose';

export interface photo {
  id: string;
  secure_url: string;
}

export interface review {
  user: string;
  name: string;
  rating: number;
  comment: string;
}

export type Product = {
  _id: string;
  __v: number;
  name: string;
  price: number;
  description: string;
  photos: photo[];
  category: 't-shirt' | 'electronics' | 'hoodie';
  stock: number;
  brand: string;
  ratings: number;
  numberOfReviews: number;
  reviews: review[];
  user: Types.ObjectId;
};
