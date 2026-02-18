import Carousel from "@/components/common/carousel/Carousel";
import ProductCategoriesGrid from "@/components/common/grid/Grid";
import ProductList from "@/components/products/ProductList";
import IphoneSection from "@/components/iphoneSection/IphoneSection";
import data from "./Productos/data/mockProductos.json";
import { useProductosStore } from "@/pages/Productos/store/useProductosStore"
import { useEffect } from "react";

const Home = () => {

  const { clearFiltros } = useProductosStore();
  
  useEffect(() => {
    return () => {
      clearFiltros(); 
    };
  }, [clearFiltros]);

  return (
    <>
      <Carousel />
      <ProductCategoriesGrid />
      <IphoneSection productos={data} />
      <ProductList />
    </>
  );
};

export default Home;