import Carousel from "@/components/common/carousel/Carousel";
import ProductCategoriesGrid from "@/components/common/grid/Grid";
import ProductList from "@/components/products/ProductList";

const Home = () => {
  return (
    <>
      <Carousel />
      <ProductCategoriesGrid />
      <ProductList />
    </>
  );
};

export default Home;