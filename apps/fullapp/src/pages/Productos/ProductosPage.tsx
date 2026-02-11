import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tag, Space } from "antd";
import FilterSidebar from "./componentes/FilterSidebar";
import ProductosGrid from "./componentes/ProductosGrid";
import ProductosSkeleton from "./componentes/ProductosSkeleton";
import { pageStyles } from "./styles/productos.styles";
import { Producto } from "./types/producto";
import data from "./data/mockProductos.json";

const ProductosPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoria = searchParams.get("categoria") || "";

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      let result = data as Producto[];

      if (categoria) {
        result = result.filter(
          (p) =>
            p.categoria === categoria ||
            p.subcategoria === categoria
        );
      }

      setProductos(result);
      setLoading(false);
    }, 500);
  }, [categoria]);

  const categorias = useMemo(() => {
    const set = new Set<string>();

    (data as Producto[]).forEach((p) => {
      if (p.categoria) set.add(p.categoria);
      if (p.subcategoria) set.add(p.subcategoria);
    });

    return Array.from(set);
  }, []);

  const filters = {
    categoria
  };

  const activeFilters = Object.entries(filters).filter(
    ([_, value]) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );

  const handleFilterChange = (key: string) => {
    setSearchParams({ categoria: key });
  };

  const handleRemoveFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete(key);

    setSearchParams(newParams);
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.filterSidebar}>
        <FilterSidebar
          categorias={categorias}
          selected={categoria}
          onChange={handleFilterChange}
        />
        <div style={{ flex: 1 }}>
          {activeFilters.length > 0 && (
            <Space
              size={[8, 8]}
              wrap
              style={{ marginBottom: 20 }}
            >
              {activeFilters.map(([key, value]) => (
                <Tag
                  key={key}
                  closable
                  onClose={() => handleRemoveFilter(key)}
                  style={pageStyles.tags}
                >
                  {key}: {value}
                </Tag>
              ))}
            </Space>
          )}
          
          {loading ? (
            <ProductosSkeleton />
          ) : (
            <ProductosGrid productos={productos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductosPage;
