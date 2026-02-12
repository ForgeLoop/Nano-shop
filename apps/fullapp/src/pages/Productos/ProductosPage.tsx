import { useMemo } from "react";
import { Pagination } from "antd";
import FilterSidebar from "./componentes/FilterSidebar";
import ProductosGrid from "./componentes/ProductosGrid";
import FiltrosActivos from "./componentes/FiltrosActivos";
import { pageStyles } from "./styles/productos.styles";
import { Producto } from "./types/producto";
import data from "./data/mockProductos.json";
import { useProductosStore } from "./store/useProductosStore";

const ProductosPage = () => {
  const productos = data as Producto[];

  const { filtros, page, pageSize, setPage } =
    useProductosStore();

  const categorias = useMemo(() => {
    const set = new Set<string>();

    productos.forEach((p) => {
      if (p.categoria) set.add(p.categoria);
      if (p.subcategoria) set.add(p.subcategoria);
    });

    return Array.from(set);
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    let result = [...productos];

    if (filtros.categorias.length) {
      result = result.filter(
        (p) =>
          filtros.categorias.includes(p.categoria) ||
          (p.subcategoria &&
            filtros.categorias.includes(p.subcategoria))
      );
    }

    if (filtros.colores.length) {
      result = result.filter((p) =>
        filtros.colores.includes(p.color)
      );
    }

    if (filtros.soloStock) {
      result = result.filter((p) => p.stock);
    }

    result = result.filter(
      (p) =>
        p.precio >= filtros.precio[0] &&
        p.precio <= filtros.precio[1]
    );

    if (filtros.ordenPrecio === "asc")
      result.sort((a, b) => a.precio - b.precio);

    if (filtros.ordenPrecio === "desc")
      result.sort((a, b) => b.precio - a.precio);

    return result;
  }, [productos, filtros]);

  const productosPaginados = useMemo(() => {
    const start = (page - 1) * pageSize;
    return productosFiltrados.slice(start, start + pageSize);
  }, [productosFiltrados, page, pageSize]);

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.filterSidebar}>
        <FilterSidebar
          productos={productos}
          categorias={categorias}
        />

        <div style={{ flex: 1 }}>

          <FiltrosActivos />

          <div
            style={{
              marginBottom: 12,
              fontWeight: 500,
              opacity: 0.8
            }}
          >
            Mostrando {productosPaginados.length} de{" "}
            {productosFiltrados.length} productos
          </div>

          <ProductosGrid productos={productosPaginados} />

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Pagination
              current={page}
              pageSize={pageSize}
              total={productosFiltrados.length}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosPage;
