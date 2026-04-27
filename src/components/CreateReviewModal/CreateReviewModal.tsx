"use client";
import {
  createReviewForProduct,
  updateReviewForProduct,
} from "@/actions/reviews.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createReviewSchema } from "@/schemas/createReview.schema";
import { ReviewFormValues } from "@/types/reviews.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface reviewModalProps {
  productId?: string;
  isUpdateMode?: boolean;
  title?: string;
  reviewId?: string;
  icon?: ReactNode;
  existingReview?: ReviewFormValues;
}

const emptyValues: ReviewFormValues = {
  review: "",
  rating: "",
};

export default function ReviewModal({
  productId,
  isUpdateMode,
  title,
  icon,
  reviewId,
  existingReview,
}: reviewModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    defaultValues: existingReview ?? emptyValues,
    resolver: zodResolver(createReviewSchema),
  });

  const handleReview = useCallback(
    async (values: ReviewFormValues) => {
      setIsLoading(true);
      const review = {
        review: values.review,
        rating: Number(values.rating),
      };
      try {
        const res = isUpdateMode
          ? await updateReviewForProduct(reviewId!, productId! , review)
          : await createReviewForProduct(productId!, review);

        if (res.message === "fail") {
          toast.error(res.errors?.msg, {
            richColors: true,
            position: "top-center",
          });
        } else {
          toast.success(
            `Review  ${isUpdateMode ? "Updated" : "Created"} Successfully!`,
            {
              richColors: true,
              position: "top-center",
            },
          );
          form.reset();
          router.refresh();
          setOpen(false);
        }
      } catch {
        toast.error("something went wrong!", {
          richColors: true,
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isUpdateMode, reviewId, productId, router, form],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {icon ? (
          <Button
            variant="default"
            className="w-10 h-10  disabled:opacity-60 disabled:cursor-not-allowed  rounded-2xl cursor-pointer bg-primary-100  text-primary-500  hover:bg-primary-500 hover:text-white transition-colors  flex items-center justify-center text-lg"
          >
            {icon}
          </Button>
        ) : (
          <Button
            variant="link"
            className="cursor-pointer  text-primary hover:text-primary-700 font-medium"
          >
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {isUpdateMode ? "Update Review" : "Create Review"}
          </DialogTitle>
          <DialogDescription>
            {isUpdateMode
              ? "Edit your review below and submit to update it."
              : " Share your experience with this product. Your review helps others make better decisions."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleReview)}>
          <FieldGroup>
            <Controller
              name="review"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-review">
                    Review
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-review"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Review"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="rating"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-rating">
                    Rating
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-rating"
                    aria-invalid={fieldState.invalid}
                    placeholder="enter rating between 1 ~ 5"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="flex gap-2 items-center">
            <DialogClose className="flex-1 cursor-pointer" asChild>
              <Button
                variant="outline"
                className=" active:scale-[0.99] hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              type="submit"
              className="flex-1 cursor-pointer hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] transition-colors  hover:text-white"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  {isUpdateMode ? " Updating..." : "Creating..."}
                </>
              ) : isUpdateMode ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
