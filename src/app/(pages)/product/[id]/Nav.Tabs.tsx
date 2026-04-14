import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productType } from "@/types/product.type";
import { FaCheck, FaStar, FaTruck } from "react-icons/fa6";
import { IoClipboard } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
export default function NavTabs({ product }: { product: productType }) {
  return (
    <Tabs defaultValue="ProductDetails" className="w-full  my-5">
      <TabsList variant="line" className=" w-full sm:w-[70%] me-auto">
        <TabsTrigger
          tabIndex={-1}
          value="ProductDetails"
          className="text-[#4A5565] cursor-pointer hover:text-primary-600 py-4 px-6 hover:bg-primary-50"
        >
          <IoClipboard /> <span>Product Details</span>
        </TabsTrigger>
        <TabsTrigger
          tabIndex={-1}
          value="Reviews"
          className="text-[#4A5565] cursor-pointer  hover:text-primary-600 py-4 px-6  hover:bg-primary-50"
        >
          <FaStar /> Reviews ({product.reviews?.length})
        </TabsTrigger>
        <TabsTrigger
          tabIndex={-1}
          value="ShippingReturns"
          className="text-[#4A5565] cursor-pointer hover:text-primary-600 py-4 px-6 hover:bg-primary-50"
        >
          <FaTruck /> Shipping & Returns
        </TabsTrigger>
      </TabsList>
      {/* Product Details Content */}
      <TabsContent
        value="ProductDetails"
        className="p-6 border-t shadow rounded-xl"
      >
        <div className="leading-7">
          <h3 className="font-semibold  text-[#101828] mb-4">
            About this Product
          </h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 col-span-2 sm:col-span-1 p-2 space-y-2">
            <h4 className="text-[#101828]">Product Information</h4>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sm"> Ctegory </span>
              <span className="text-sm text-[#101828]">
                {product.category.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sm"> Subcategory </span>
              <span className="text-sm text-[#101828]">
                {product.subcategory[0].name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sm"> Brand </span>
              <span className="text-sm text-[#101828]">
                {product.brand.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sm"> Items Sold </span>
              <span className="text-sm text-[#101828]">{product.sold}</span>
            </div>
          </div>
          <div className="bg-gray-50 col-span-2 sm:col-span-1 p-2 space-y-2">
            <h4 className="text-[#101828]">Key Features</h4>
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
      <TabsContent value="Reviews">Change your password here.</TabsContent>
      <TabsContent value="ShippingReturns">
        <div className="grid sm:grid-cols-2 gap-4 my-5">
          <div className="bg-gray-100 p-5 rounded-lg space-y-2">
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
