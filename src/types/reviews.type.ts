import { createReviewSchema } from "@/schemas/createReview.schema";
import * as z from "zod";
export interface reviewsRes {
  data: reviewData[];
}
export interface updateReviewsRes {
  data: reviewData;
  message?: string;
  errors?: errors;
}

export interface reviewData {
  createdAt: string;
  _id: string;
  updatedAt: string;
  review: string;
  rating: number;
  product: string;
  user: user;
}
interface user {
  name: string;
  _id: string;
}

export interface createReviewsRes {
  data?: {
    _id: string;
    user: string;
    updatedAt: string;
    review: string;
    rating: number;
    product: string;
    createdAt: string;
  };
  message?: string;
  errors?: errors;
}
interface errors {
  location: string;
  param: string;
  msg: string;
  value: string;
}

export type ReviewFormValues  = z.infer<typeof createReviewSchema>;
