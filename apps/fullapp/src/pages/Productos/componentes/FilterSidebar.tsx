import React from "react";
import { filterSidebar } from "../styles/productos.styles";

interface Props {
  categorias: string[];
  selected: string;
  onChange: (key: string) => void;
}

const FilterSidebar: React.FC<Props> = ({
  categorias,
  selected,
  onChange
}) => {
  return (
    <div style={filterSidebar.container}>
      <h3 style={filterSidebar.titulo}>Categorías</h3>

      {categorias.map((cat) => (
        <div
          key={cat}
          onClick={() => onChange(cat)}
          style={filterSidebar.catTags(selected, cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
