import Carousel from "@/components/common/carousel/Carousel";
import ProductCategoriesGrid from "@/components/common/grid/Grid";
import ProductList from "@/components/products/ProductList";
import { useProductosStore } from "@/pages/Productos/store/useProductosStore"
import { useEffect } from "react";

const Home = () => {

  const { clearFiltros } = useProductosStore();
  
  useEffect(() => {
    clearFiltros();
  }, [clearFiltros]);

  return (
    <>
      <Carousel />
      <ProductCategoriesGrid />
      <ProductList />
    </>
  );
};

export default Home;