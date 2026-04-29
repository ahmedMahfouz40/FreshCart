import { getReviewsForProduct } from "@/actions/reviews.action";
import CardReview from "@/components/CardReview/CardReview";
import ReviewModal from "@/components/CreateReviewModal/CreateReviewModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productType } from "@/types/product.type";
import { BsStarHalf } from "react-icons/bs";
import { FaCheck, FaRegStar, FaStar, FaTruck } from "react-icons/fa6";
import { IoClipboard } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
export default async function NavTabs({ product }: { product: productType }) {
  const res = await getReviewsForProduct(product._id);
  const reviews = res?.data;
  const hasReviews = reviews && reviews.length > 0;
  const defaultCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: 0,
    pct: star === 1 ? 25 : 5,
  }));
  const ratingAvg = hasReviews
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";
  const counts = hasReviews
    ? [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
        pct: Math.round(
          (reviews.filter((r) => r.rating === star).length / reviews.length) *
            100,
        ),
      }))
    : defaultCounts;

  return (
    <Tabs
      defaultValue="ProductDetails"
      className="w-full  my-5 border-b border-x border-gray-100 rounded-b-2xl"
    >
      <TabsList
        variant="line"
        className=" w-full lg:w-[70%] flex flex-wrap gap-2 me-auto mb-8"
      >
        <TabsTrigger
          tabIndex={-1}
          value="ProductDetails"
          className="text-[#4A5565]  cursor-pointer hover:text-primary-600 whitespace-nowrap text-xs sm:text-lg  py-3 sm:py-6 px-1 sm:px-6 hover:bg-primary-50 "
        >
          <IoClipboard /> <span>Product Details</span>
        </TabsTrigger>
        <TabsTrigger
          tabIndex={-1}
          value="Reviews"
          className="text-[#4A5565] cursor-pointer  hover:text-primary-600 whitespace-nowrap text-xs sm:text-lg  py-3 sm:py-6 px-1 sm:px-6  hover:bg-primary-50"
        >
          <FaStar /> Reviews ({reviews?.length})
        </TabsTrigger>
        <TabsTrigger
          tabIndex={-1}
          value="ShippingReturns"
          className="text-[#4A5565] cursor-pointer hover:text-primary-600 whitespace-nowrap text-xs sm:text-lg  py-3 sm:py-6 px-1 sm:px-6 hover:bg-primary-50"
        >
          <FaTruck /> Shipping & Returns
        </TabsTrigger>
      </TabsList>
      {/* Product Details Content */}
      <TabsContent
        value="ProductDetails"
        className="p-6 border-t border-gray-100 shadow rounded-b-xl "
      >
        <div className="leading-7">
          <h3 className="font-semibold  text-heading mb-4">
            About this Product
          </h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 col-span-2 sm:col-span-1 p-2 space-y-2">
            <h4 className="text-heading">Product Information</h4>
            <div className="flex justify-between">
             <span className="text-gray-500 font-sm"> Category </span>
              <span className="text-sm text-heading">
                {product.category.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sm"> Subcategory </span>
              <span className="text-sm text-heading">
                {product.subcategory[0].name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sm"> Brand </span>
              <span className="text-sm text-heading">{product.brand.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sm"> Items Sold </span>
              <span className="text-sm text-heading">{product.sold}</span>
            </div>
          </div>
          <div className="bg-gray-50 col-span-2 sm:col-span-1 p-2 space-y-2">
            <h4 className="text-heading">Key Features</h4>
            <div className="flex gap-2">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <span className="text-gray-500 font-sm">
                Premium Quality Product
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <span className="text-gray-500 font-sm">
                100% Authentic Guarantee
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <span className="text-gray-500 font-sm">
                Fast & Secure Packaging
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <span className="text-gray-500 font-sm"> Quality Tested </span>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Reviews */}
      <TabsContent value="Reviews">
        <div className="p-1 sm:p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {ratingAvg}
                </div>
                <div className="flex gap-1 justify-center text-[#FCC800] text-lg">
                  {[1, 2, 3, 4, 5].map((star) => {
                    if (+ratingAvg >= star) {
                      return <FaStar key={star} />;
                    } else if (+ratingAvg >= star - 0.5) {
                      return <BsStarHalf key={star} />;
                    } else {
                      return <FaRegStar key={star} />;
                    }
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Based on {reviews?.length ?? 0} reviews
                </p>
              </div>
              <div className="flex-1 w-full">
                {counts.map((item) => (
                  <div key={item.star} className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-8">
                      {item.star} star
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: item.pct + "%" }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t max-h-100 overflow-y-auto scrollbar  border-gray-200 pt-6 space-y-4">
              {hasReviews &&
                reviews.map((item) => (
                  <CardReview key={item._id} item={item}  />
                ))}
            </div>
            {/* Create Review */}
            <div className="text-center py-8">
              <span className="text-6xl text-gray-300 mb-3 inline-block">
                <FaStar />
              </span>

              <p className="text-gray-500">
                Customer reviews will be displayed here.
              </p>
              <ReviewModal
                title="Write a Review"
                productId={product._id}
              />
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Shipping & Returns */}
      <TabsContent value="ShippingReturns">
        <div className="grid sm:grid-cols-2 gap-4 my-5">
          <div className="bg-gray-100 p-5 rounded-lg space-y-2  border-t border-gray-200 shadow rounded-b-xl ">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary-600 w-12 h-12 text-2xl text-white flex items-center justify-center">
                <FaTruck />
              </span>
              <h4 className="font-semibold text-lg">Shipping Information</h4>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">Free shipping on orders over $50</p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">
                Standard delivery: 3-5 business days
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">
                Express delivery available (1-2 business days)
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">Track your order in real-time</p>
            </div>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <span className=" rounded-full bg-primary-600 w-12 h-12 text-2xl text-white flex items-center justify-center">
                <TbReload />
              </span>
              <h4 className="font-semibold text-lg">Returns & Refunds</h4>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">30-day hassle-free returns</p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">Full refund or exchange available</p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">
                Free return shipping on defective items
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-primary-600">
                <FaCheck />
              </span>
              <p className="text-gray-800">Easy online return process</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
