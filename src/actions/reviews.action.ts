"use server";
import {
  createReviewsRes,
  reviewsRes,
  updateReviewsRes,
} from "@/types/reviews.type";
import getMyToken from "@/utils/getMyToken";
import { revalidatePath } from "next/cache";

export async function getReviewsForProduct(
  id: string,
): Promise<reviewsRes | null> {
  try {
    const response = await fetch(
      `${process.env.apiLink_v1}/products/${id}/reviews`,
      {
        cache: "no-store",
      },
    );
    const finalRes = await response.json();

    return finalRes;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function createReviewForProduct(
  productId: string,
  review: {
    review: string;
    rating: number;
  },
): Promise<createReviewsRes> {
  const token = await getMyToken();
  const response = await fetch(
    `${process.env.apiLink_v1}/products/${productId}/reviews`,
    {
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
      method: "POST",
    },
  );

  const finalRes = await response.json();
  console.log("create response:", finalRes);
  if (finalRes.message !== "fail") {
    revalidatePath(`/products/${productId}`);
  }
  return finalRes;
}

export async function deleteReviewForProduct(
  reviewId: string,
  productId: string,
): Promise<createReviewsRes> {
  const token = await getMyToken();
  const response = await fetch(
    `${process.env.apiLink_v1}/reviews/${reviewId}`,
    {
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    },
  );
  if (response.status === 204) {
    revalidatePath(`/products/${productId}`);
    return { message: "success" };
  }
  const finalRes = await response.json();
  return finalRes;
}

export async function updateReviewForProduct(
  reviewId: string,
  productId: string,
  NewReview: {
    review: string;
    rating: number;
  },
): Promise<updateReviewsRes> {
  const token = await getMyToken();
  const response = await fetch(
    `${process.env.apiLink_v1}/reviews/${reviewId}`,
    {
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewReview),
      method: "PUT",
    },
  );
  const finalRes = await response.json();
  if (finalRes.message !== "fail") {
    revalidatePath(`/products/${productId}`); // ✅ Bug 2 fixed: was missing entirely
  }
  return finalRes;
}
