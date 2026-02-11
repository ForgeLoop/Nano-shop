import { Skeleton } from "antd";
import { productosSkeleton } from "../styles/productos.styles";

const ProductosSkeleton = () => {
  return (
    <div
      style={productosSkeleton.container}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton.Image key={i} style={productosSkeleton.skeletonImg} active />
      ))}
    </div>
  );
};

export default ProductosSkeleton;
