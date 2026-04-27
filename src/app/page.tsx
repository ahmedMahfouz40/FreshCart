import ProductCard from "../components/ProductCard/ProductCard";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const ShopByCategories = dynamic(
  () => import("../components/ShopByCategories/ShopByCategories"),
);
import CardsHome from "../components/CardsHome/CardsHome";
import Figure from "../components/SmallCards/Figure";
import CategorySkeleton from "@/app/_skeletons/CategorySkeleton";
import Container from "../components/Container/Container";
import { getProducts } from "@/actions/products.action";
import HomeSlider from "./_sliders/HomeSlider";
const Home = async () => {
  const products = await getProducts();

  return (
    <div className=" my-5">
      <HomeSlider />
      <Container>
        <div>
          <Figure />
          <Suspense fallback={<CategorySkeleton />}>
            <ShopByCategories />
          </Suspense>
          <CardsHome />
          {/* =============== */}

          {/* =============== */}
          <h2 className="border-s-5 border-primary-600 px-2 rounded my-3 font-bold text-3xl">
            <span>Featured</span>
            <span className="text-primary-600 border-primary-600">
              Products
            </span>
          </h2>
          <div className="grid  sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5  gap-4">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
