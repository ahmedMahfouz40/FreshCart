import Container from "@/components/Container/Container";
import NoProducts from "@/components/NoProducts/NoProducts";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getProducts } from "@/actions/products.action";
import Image from "next/image";
import Link from "next/link";
import {
  FaBoxOpen,
  FaFilter,
  FaFolderOpen,
  FaLayerGroup,
  FaXmark,
} from "react-icons/fa6";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ subCategory?: string; brand?: string }>;
}) => {
  const { subCategory, brand } = await searchParams;

  const products = await getProducts(subCategory, brand);

  const categoryName = products?.[0]?.subcategory?.[0]?.name;

  return (
    <div className="my-5">
      <div className="   bg-linear-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80] text-white   w-full h-50 py-14 px-4">
        <Container>
          <div className="space-y-5">
            <p className="text-sm leading-5 ">
              {subCategory || brand ? (
                <>
                  <Link href={"/"} className="opacity-70 hover:opacity-100">
                    Home /
                  </Link>
                  <Link
                    href={`/${subCategory ? "categories" : "brands"}`}
                    className="opacity-70 hover:opacity-100"
                  >
                    {subCategory ? "categories " : "brands "} /
                  </Link>
                  <span>{categoryName}</span>
                </>
              ) : (
                <>
                  <Link href={"/"} className="opacity-70 hover:opacity-100">
                    Home /
                  </Link>
                  <span>All Products</span>
                </>
              )}
            </p>
            <div className="flex items-center gap-3">
              <div className="relative overflow-hidden w-16 h-16 rounded-2xl flex items-center justify-center text-4xl  bg-white/20">
                {subCategory || brand ? (
                  products?.[0]?.imageCover ? (
                    <Image
                      src={products[0].imageCover}
                      alt="product"
                      className="w-full"
                      fill
                    />
                  ) : (
                    <FaFolderOpen />
                  )
                ) : (
                  <FaBoxOpen />
                )}
              </div>
              <div>
                <h1 className="text-4xl leading-10 font-bold ">
                  {subCategory || brand
                    ? (categoryName ?? "Products")
                    : "All Products"}
                </h1>
                <p className="opacity-80">
                  {subCategory || brand
                    ? `Browse ${categoryName ?? ""} products`
                    : "Explore our complete product collection"}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="my-5">
          {(subCategory || brand) && (
            <div className="mb-6 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <FaFilter />
                Active Filters:
              </span>
              <Link
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium hover:bg-primary-200 transition-colors"
                href="/products"
              >
                <FaLayerGroup className="text-xs" />
                {categoryName}
                <FaXmark className="text-xs" />
              </Link>
              <Link
                className="text-sm text-gray-500 hover:text-gray-700 underline"
                href="/products"
              >
                Clear all
              </Link>
            </div>
          )}
          <p className="text-sm leading-5 text-[#6A7282] mb-10">
            Showing {products?.length ?? 0} products
          </p>
        </div>
        {products && products?.length > 0 ? (
          <div className="grid  sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5  gap-4">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}
      </Container>
    </div>
  );
};

export default page;
