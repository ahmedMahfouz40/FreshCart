import * as z from "zod";
export const createReviewSchema = z.object({
  review: z.string().nonempty("enter your review"),
  rating: z
    .string()
    .max(5, "maximum rating: 5 ")
    .min(1, "minimum rating: 1")
    .regex(/^[1-5]$/, "enter number between 1 to 5"),
});
