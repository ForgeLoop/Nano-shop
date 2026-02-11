import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import Home from "@/pages/Home";
import Nosotros from "@/pages/Nosotros";
import Contacto from "@/pages/Contacto";
import Admin from "@/pages/Admin";
import ProductosPage from "@/pages/Productos/ProductosPage";
// ...otros imports

type AppProps = {
  theme?: any; // Ajusta el tipo según tu theme
};

const App: React.FC<AppProps> = ({ theme }) => (
   <ConfigProvider theme={theme}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/:option" element={<Admin />} />
      {/* ...más rutas */}
    </Routes>
    <Footer />
  </ConfigProvider>
);

export default App;