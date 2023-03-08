export interface User {
  _id: string;
  __v: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'manager';
  photo?: { id: string; secure_url: string };
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: string;
  createdAt: string;
  updatedAt: string;
}
