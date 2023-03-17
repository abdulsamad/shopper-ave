export interface Photo {
  id: string;
  secure_url: string;
}

export interface Review {
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
}

export interface Product<TUser = string> {
  _id: string;
  __v: string;
  name: string;
  price: number;
  description: string;
  photos: Photo[];
  category: string;
  brand: string;
  stock: number;
  ratings: number;
  numberOfReviews: number;
  user: TUser;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}
