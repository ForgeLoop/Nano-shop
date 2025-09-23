import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import Home from "@/pages/Home";
import Nosotros from "@/pages/Nosotros";
import Contacto from "@/pages/Contacto";
import Admin from "@/pages/Admin";
// ...otros imports

type FullAppProps = {
  theme?: any; // Ajusta el tipo según tu theme
};

const FullApp: React.FC<FullAppProps> = ({ theme }) => (
   <ConfigProvider theme={theme}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/:option" element={<Admin />} />
      {/* ...más rutas */}
    </Routes>
    <Footer />
  </ConfigProvider>
);

export default FullApp;