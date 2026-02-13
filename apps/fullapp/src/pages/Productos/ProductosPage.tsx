import { useMemo, useEffect } from "react";
import { Pagination } from "antd";
import FilterSidebar from "./componentes/FilterSidebar";
import ProductosGrid from "./componentes/ProductosGrid";
import FiltrosActivos from "./componentes/FiltrosActivos";
import { pageStyles } from "./styles/productos.styles";
import { Producto } from "./types/producto";
import data from "./data/mockProductos.json";
import { useProductosStore } from "./store/useProductosStore";
import { useSearchParams } from "react-router-dom";

const ProductosPage = () => {
  const productos = data as Producto[];
  const [searchParams] = useSearchParams();

  const {
    filtros,
    page,
    pageSize,
    setPage,
    toggleCategoria,
    toggleColor,
    setStock,
    setOrden,
    setPrecio
  } = useProductosStore();

  // 🔥 SINCRONIZA URL -> STORE
  useEffect(() => {
    const categoria = searchParams.get("categoria");
    const color = searchParams.get("color");
    const stock = searchParams.get("stock");
    const orden = searchParams.get("orden");
    const precioMin = searchParams.get("min");
    const precioMax = searchParams.get("max");

    if (categoria && !filtros.categorias.includes(categoria)) {
      toggleCategoria(categoria);
    }

    if (color && !filtros.colores.includes(color)) {
      toggleColor(color);
    }

    if (stock === "true" && !filtros.soloStock) {
      setStock(true);
    }

    if (orden === "asc" || orden === "desc") {
      if (filtros.ordenPrecio !== orden) {
        setOrden(orden);
      }
    }

    if (precioMin && precioMax) {
      const min = Number(precioMin);
      const max = Number(precioMax);

      if (
        filtros.precio[0] !== min ||
        filtros.precio[1] !== max
      ) {
        setPrecio([min, max]);
      }
    }
  }, [searchParams]); // ❗ SOLO URL cambia



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
