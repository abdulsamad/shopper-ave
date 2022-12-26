export interface Product {
  _id: string;
  __v: string;
  name: string;
  price: string;
  description: string;
  photos?: [
    {
      _id: string;
      id: string;
      secure_url: string;
    }
  ];
  category: string;
  brand: string;
  stock: number;
  ratings: number;
  numberOfReviews: number;
  user: string;
  reviews: [
    {
      _id: string;
      user: string;
      name: string;
      rating: number;
      comment: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}
