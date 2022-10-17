export type photo = {
  id: string;
  secure_url: string;
};

export type review = {
  user: string;
  name: string;
  rating: number;
  comment: string;
};

export type Product = {
  _id: string;
  __v: number;
  name: string;
  price: number;
  description: string;
  photos: photo[];
  category: string;
  brand: string;
  ratings: number;
  numberOfReviews: number;
  reviews: review[];
  user: object;
};
