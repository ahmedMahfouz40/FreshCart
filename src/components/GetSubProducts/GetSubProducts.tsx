// Create a new component: SubProductsSection.tsx
import { getSubProducts } from "@/actions/products.action";
import SubProductsSlider from "@/components/Sliders/subProductsFromProductDetails";

const SubProductsSection = async ({ categoryId }: { categoryId: string }) => {
  const subProducts = await getSubProducts(categoryId);

  return <SubProductsSlider products={subProducts ?? []} />;
};

export default SubProductsSection;
