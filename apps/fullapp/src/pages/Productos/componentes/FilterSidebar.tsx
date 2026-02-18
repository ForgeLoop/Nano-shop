import React, { useMemo } from "react";
import { Slider, Switch, Select } from "antd";
import { filterSidebar } from "../styles/productos.styles";
import { useProductosStore } from "../store/useProductosStore";
import { Producto } from "../types/producto";

interface Props {
  productos: Producto[];
  categorias: string[];
}

const FilterSidebar: React.FC<Props> = ({
  productos,
  categorias
}) => {
  const {
    filtros,
    toggleCategoria,
    toggleColor,
    setPrecio,
    setStock,
    setDescuento,
    setOrden
  } = useProductosStore();

  const colores = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => p.color && set.add(p.color));
    return Array.from(set);
  }, [productos]);

  const precios = useMemo(() => {
    const valores = productos.map((p) => p.precio);
    return [Math.min(...valores), Math.max(...valores)];
  }, [productos]);

  return (
    <div style={filterSidebar.container}>
      <h3 style={filterSidebar.titulo}>Categorías</h3>

      {categorias.map((cat) => {
        const selected = filtros.categorias.includes(cat);

        return (
          <div
            key={cat}
            onClick={() => toggleCategoria(cat)}
            style={filterSidebar.catTags(selected, true)}
          >
            {cat}
          </div>
        );
      })}

      <h3 style={filterSidebar.titulo}>Colores</h3>

      {colores.map((c) => {
        const selected = filtros.colores.includes(c);

        return (
          <div
            key={c}
            onClick={() => toggleColor(c)}
            style={filterSidebar.catTags(selected, true)}
          >
            {c}
          </div>
        );
      })}

      <h3 style={filterSidebar.titulo}>Precio</h3>

      <Slider
        range
        min={precios[0]}
        max={precios[1]}
        value={filtros.precio}
        onChange={(v) => setPrecio(v as [number, number])}
      />


      <h3 style={filterSidebar.titulo}>En oferta</h3>

      <Slider
        range
        min={0}
        max={100}
        value={filtros.descuento}
        onChange={(v) => setDescuento(v as [number, number])}
      />

      
      <h3 style={filterSidebar.titulo}>Ordenar</h3>

      <Select
        style={{ width: "100%" }}
        placeholder="Precio"
        value={filtros.ordenPrecio}
        onChange={setOrden}
        options={[
          { label: "Menor a mayor", value: "asc" },
          { label: "Mayor a menor", value: "desc" }
        ]}
      />
      
        <h3 style={filterSidebar.titulo}>Con stock</h3>
  
        <Switch checked={filtros.soloStock} onChange={setStock} />
    </div>
  );
};

export default FilterSidebar;
