import { useState, useEffect, useMemo } from "react";
import { Layout } from "antd";
import { useIsMobile } from "@/hooks/useWindowSize";
import { adminStyles } from "@/pages/pages.styles";
import { DeleteModal } from "@/components/admin/shared/DeleteModal";
import { useCrud } from "@/hooks/useCrud";
import ProductsList from "@/components/admin/products/components/ProductsList";
import { Product, productService } from "@/services/productService";
import CreateUpdateProductModal from "@/components/admin/products/modals/CreateUpdateProductModal";

export default function Admin() {
  // Products
  const { data: products, loading: getProductsLoading, execute:fetchProducts} = useCrud<Product[]>(productService.getAllProducts);
  const { data: product, loading: getProductLoading, execute: fetchProduct } = useCrud<Product | null>(productService.getProductById);
  const { execute: updateProduct, loading: loadingUpdateProduct } = useCrud(productService.updateProduct)
  const { execute: deleteProduct, loading: loadingDeleteProduct } = useCrud(productService.deleteProduct)
  const { execute: createProduct, loading: loadingCreateProduct } = useCrud(productService.createProduct)
  const isLoadingProducts = useMemo(() => getProductsLoading || getProductLoading || loadingUpdateProduct || loadingDeleteProduct || loadingCreateProduct, [getProductsLoading, getProductLoading, loadingUpdateProduct, loadingDeleteProduct, loadingCreateProduct]);
  
  const isMobile = useIsMobile();

  // Products Consts
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [deleteProductObject, setDeleteProductObject] = useState<Product | null>(null);
  const [deleteProductModal, setDeleteProductModal] = useState(false);

  useEffect(() => {
      fetchProducts();
  }, []);

  // Products handlers
  const handleUpdateProduct = async (id: number) => {
    await fetchProduct(id);
    setUpdateProductModal(true);
  }
  const confirmUpdateProduct = async (id: number | string | undefined, body: Product) => {
    setUpdateProductModal(false);
    await updateProduct(id, body);
    fetchProducts();
  }
  const handleDeleteProduct = async (product: Product) => {
    setDeleteProductObject(product);
    setDeleteProductModal(true);
  }
  const confirmDeleteProduct = async (id: number | string) => {
    setDeleteProductModal(false);
    await deleteProduct(id);
    fetchProducts();
  }
  const handleCreateProduct = () => {
    setCreateProductModal(true);
  }
  const confirmCreateProduct = async (body: Product) => {
    setCreateProductModal(false);
    await createProduct(body);
    fetchProducts();
  }
  const handleProductSubmit = (id: number | string | undefined, values: any) => {
    if (id) {
      confirmUpdateProduct(id, values);
    } else {
      confirmCreateProduct(values);
    }
  }

  return (
    <Layout>
        {isLoadingProducts || products && (
            <ProductsList 
                products={products}
                onEdit={handleUpdateProduct}
                onDelete={handleDeleteProduct}
                adminStyles={adminStyles}
                onCreate={handleCreateProduct}
                isMobile={isMobile}
            />
        )}
        {updateProductModal && product && (
            <CreateUpdateProductModal 
                open={updateProductModal}
                onCancel={() => {
                    setUpdateProductModal(false)
                }}
                onSubmit={handleProductSubmit}
                isMobile={isMobile}
                adminStyles={adminStyles}
                product={product}
                loading={getProductLoading}
            />
        )}
        {createProductModal && (
            <CreateUpdateProductModal 
                open={createProductModal}
                onCancel={() => {
                    setCreateProductModal(false)
                }}
                onSubmit={handleProductSubmit}
                isMobile={isMobile}
                adminStyles={adminStyles}
            />
        )}
        {deleteProductModal && (
            <DeleteModal
                open={deleteProductModal}
                title="¿Eliminar producto?"
                message={deleteProductObject ? `¿Seguro que quieres eliminar el producto "${deleteProductObject.name}"?` : ""}
                onCancel={() => {
                    setDeleteProductObject(null);
                    setDeleteProductModal(false);
                }}
                onDelete={() => {
                    if (deleteProductObject) confirmDeleteProduct(deleteProductObject.id);
                    setDeleteProductObject(null);
                }}
            />
        )}
    </Layout>
  );
}