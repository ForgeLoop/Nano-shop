import { useMemo, useEffect, useRef } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    filtros,
    page,
    pageSize,
    setPage,
    setNombre,
    toggleCategoria,
    toggleColor,
    setStock,
    setOrden,
    setPrecio
  } = useProductosStore();

  
  useEffect(() => {
    if (!isFirstRender.current) return;
    
    const categoria = searchParams.get("categoria");
    const color = searchParams.get("color");
    const stock = searchParams.get("stock");
    const orden = searchParams.get("orden");
    const precioMin = searchParams.get("min");
    const precioMax = searchParams.get("max");

    const nombre = searchParams.get("nombre");
    if (nombre && nombre.trim()) {
      setNombre(nombre.trim());
    }

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

    isFirstRender.current = false;
  }, []);

  
  useEffect(() => {
    if (isFirstRender.current) return;

    const params = new URLSearchParams();

    // Agregar nombre de búsqueda
    if (filtros.nombre.trim()) {
      params.set("nombre", filtros.nombre.trim());
    }

    // Agregar categorías
    filtros.categorias.forEach((cat) => params.append("categoria", cat));

    // Agregar colores
    filtros.colores.forEach((color) => params.append("color", color));

    // Agregar stock
    if (filtros.soloStock) {
      params.set("stock", "true");
    }

    // Agregar orden
    if (filtros.ordenPrecio) {
      params.set("orden", filtros.ordenPrecio);
    }

    // Agregar rango de precio (solo si no es el default)
    if (filtros.precio[0] !== 0) {
      params.set("min", String(filtros.precio[0]));
    }
    if (filtros.precio[1] !== 999999) {
      params.set("max", String(filtros.precio[1]));
    }

    // Actualizar URL sin agregar al historial
    setSearchParams(params, { replace: true });
  }, [filtros, setSearchParams]);

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

    if (filtros.nombre.trim()) {
      const search = filtros.nombre.toLowerCase();

      result = result.filter((p) =>
        p.nombre?.toLowerCase().includes(search) ||
        p.categoria?.toLowerCase().includes(search) ||
        p.subcategoria?.toLowerCase().includes(search)
      );
    }

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
    return productosFiltrados.slice(start, start + pageSize).map((p) => ({
      ...p,
      id: String(p.id)
    }));
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

          {productosFiltrados.length === 0 && (
            <div style={{ textAlign: "center", padding: 40 }}>
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar los filtros</p>
            </div>
          )}

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