import { getProduct, getSubProducts } from "@/actions/products.action";
import Rating from "@/components/Rating/Rating";
import Quantity from "./Quantity";
import { FaTruckFast } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import ProductDetailsBtns from "../../../../components/Buttons/ProductDetailsBtns";
import NavTabs from "./Nav.Tabs";
import ScrollToTop from "@/utils/ScrollToTop";
import Container from "@/components/Container/Container";
import ProductDetailsSlider from "@/app/_sliders/ProductDetailsSlider";
import Slider from "@/app/_sliders/subProductsFromProductDetails";
import { Suspense } from "react";
import ProductSliderSkeleton from "@/app/_skeletons/ProductsSliderSkeleton";
import TabsSkeleton from "@/app/_skeletons/TabsSkeleton";

const figure = [
  {
    icon: <FaTruckFast />,
    title: "Free Delivery",
    desc: "Orders over $50",
  },
  {
    icon: <IoReload />,
    title: "30 Days Return",
    desc: "Money back",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payment",
    desc: "100% Protected",
  },
];

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <p className="text-red-400 text-2xl font-bold italic">
          Products not found
        </p>
      </div>
    );
  }

  const subProducts = await getSubProducts(product.category._id);
  //? Calc Discount Percentage
  const percentageDiscount: number | null = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : null;

  return (
    <>
      <ScrollToTop />
      <Container>
        <div>
          <div className=" grid lg:grid-cols-12 gap-4  my-10">
            <div className="lg:col-span-4 mb-5 flex justify-center shadow-xl">
              <ProductDetailsSlider images={product.images} />
            </div>
            <div className="lg:col-span-8 p-6 space-y-5 shadow-xl">
              <div>
                <span className="text-primary-600 py-1.5 me-2  text-xs px-3 bg-primary-100 rounded-2xl">
                  {product.category.name}
                </span>
                <span className="bg-gray-100 py-1.5 px-3 text-xs rounded-2xl text-[#364153]">
                  {product.brand.name}
                </span>
              </div>
              <h2 className="text-3xl leading-9 font-bold text-heading my-3">
                {product.title}
              </h2>
              <div className="flex gap-1 ">
                <Rating rating={product.ratingsAverage} />
                <div className="text-xs text-[#6A7282] leading-4">
                  ({product.reviews?.length || 0} reviews)
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {/* Price */}
                {product.priceAfterDiscount ? (
                  <>
                    <div className="flex items-center">
                      <div>
                        <span className="font-bold text-3xl text-heading leadign-8  my-4">
                          {product.priceAfterDiscount} EGP
                        </span>
                        <span className="line-through ms-2 text-gray-300 leadign-8  my-4">
                          {product.price} EGP
                        </span>
                      </div>
                      {/* Precentage Discount */}

                      <span className=" rounded-xl ms-2 inline text-sm p-1 bg-red-500 text-white">
                        <span> Save {percentageDiscount} % </span>
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="font-bold text-3xl text-heading leadign-8 block my-4">
                    {product.price} EGP
                  </span>
                )}
              </div>
              {product.quantity > 0 && (
                <div className="my-5">
                  <div className="inline-flex items-center text-sm leading-5 gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-green-600 font-semibold ">
                      In Stock
                    </span>
                  </div>
                </div>
              )}
              {/* Description */}
              <p className="text-[#4A5565] my-3 border-t py-3">
                {product.description}
              </p>
              {/* Quantity and total price  */}
              <Quantity
                quantity={product.quantity}
                price={product.priceAfterDiscount || product.price}
              />
              {/* Buttons */}
              <ProductDetailsBtns productId={id} />
              {/* small cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-5 gap-4   border-t mx-auto py-2">
                {figure.map((fig) => {
                  return (
                    <div
                      key={fig?.title}
                      className="flex items-center gap-2 rounded-xl p-3   "
                    >
                      <span
                        className={`bg-primary-100 text-primary-600 w-12 h-12 flex items-center justify-center rounded-full`}
                      >
                        {fig.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold mb-1">{fig?.title}</h3>
                        <p className="text-xs text-[#6A7282]">{fig?.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Suspense fallback={<TabsSkeleton />}>
            <NavTabs product={product} />
          </Suspense>

          <div className="space-y-5 mt-10">
            <div className="flex justify-between">
              <h2 className="border-s-8 border-primary-600 rounded text-2xl ps-3 font-bold text-gray-800">
                You May Also <span className=" text-primary-600">Like</span>
              </h2>
            </div>
            <Suspense fallback={<ProductSliderSkeleton />}>
              <Slider key={product._id} products={subProducts} />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetails;
