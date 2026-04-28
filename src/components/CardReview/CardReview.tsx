"use client";
import { reviewData } from "@/types/reviews.type";
import { FaPencil, FaSpinner, FaTrash } from "react-icons/fa6";
import Rating from "../Rating/Rating";
import { getMyId } from "@/utils/getMyId";
import { useEffect, useState } from "react";
import { deleteReviewForProduct } from "@/actions/reviews.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
const CardReview = ({ item }: { item: reviewData }) => {
  const [myId, setMyId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function handleGetMyId() {
      const myId = await getMyId();
      setMyId(myId);
    }
    handleGetMyId();
  }, []);
  const isOwner = myId === item.user._id;

  async function handleDeleteReview(reviewId: string) {
    setIsDeleting(true);
    const res = await deleteReviewForProduct(reviewId, item.product);
    if (res.message === "fail") {
      toast.error(res.errors?.msg, {
        richColors: true,
        position: "top-center",
      });
      setIsDeleting(false);
    } else {
      toast.success("Review deleted successfully!", {
        richColors: true,
        position: "top-center",
      });
      setIsDeleting(false);
      router.refresh();
    }
  }

  return (
    <div className="bg-gray-50/70 rounded-2xl py-2 px-1 sm:p-4">
      <div className="  flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2 ">
          <span className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-primary-100 text-primary">
            {item.user.name.slice(0, 1)}
          </span>
          <div className="space-y-1">
            <h4 className="text-heading font-semibold ">{item.user.name}</h4>
            <p className="text-gray-400 text-sm">
              {item.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
        <div className="self-end ms-auto ">
          {/* Only show edit/delete if the logged-in user owns this review */}
          {isOwner && (
            <div className="  flex items-center justify-end gap-2 mb-2 sm:mb-4">
              <CreateReviewModal
                existingReview={{
                  review: item.review,
                  rating: String(item.rating),
                }}
                isUpdateMode = {true}
                icon={<FaPencil />}
                reviewId={item._id}
              />
              <button
                disabled={isDeleting}
                onClick={() => handleDeleteReview(item._id)}
                className="w-10 h-10  disabled:opacity-60 disabled:cursor-not-allowed  rounded-2xl cursor-pointer bg-red-100  text-red-500  hover:bg-red-500 hover:text-white transition-colors  flex items-center justify-center text-lg"
              >
                {isDeleting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaTrash />
                )}
              </button>
            </div>
          )}
          <Rating rating={item.rating ?? 0} />
        </div>
      </div>
      {/* Content */}
      <div className="py-5 text-gray-500 px-2 bg-gray-50/10 w-full   wrap-break-word">{item.review}</div>
    </div>
  );
};

export default CardReview;
