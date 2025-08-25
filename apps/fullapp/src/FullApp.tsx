import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Carousel from "./components/carousel/Carousel";
import ProductCategoriesGrid from "./components/grid/Grid";
import Footer from "./components/footer/Footer";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";

// ...otros imports

const FullApp: React.FC = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={
        <>
          <Carousel />
          <ProductCategoriesGrid />
        </>
      } />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<Contacto />} />
      {/* ...más rutas */}
    </Routes>
    <Footer />
  </>
);

export default FullApp;