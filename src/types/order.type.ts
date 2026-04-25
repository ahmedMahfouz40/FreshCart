import { cartItemType } from "./cart.type";

export interface shippingAddressType {
  shippingAddress: orderValues;
}

export interface orderValues {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
  paymentMethod?: string;
  address?: string;
}

export interface createOrderResponse {
  data: orderData;
  message: string;
  pricing: {
    totalOrderPrice: number;
    taxPrice: number;
    shippingPrice: number;
    cartPrice: number;
  };
  status: string;
  user: user;
}
export interface orderData {
  cartItems: cartItemType[];
  createdAt: string;
  id: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: string;
  updatedAt: string;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  shippingAddress: {
    postalCode: string;
    phone: string;
    details: string;
    city: string;
  };
  user: user;
}
export interface user {
  _id: string;
  phone: string;
  name: string;
  email: string;
}
