import { useState, useEffect, Suspense, useMemo } from "react";
import {
  Layout, 
  Menu,
  Progress,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/useWindowSize";
import { adminStyles } from "@/pages/pages.styles";
import { DeleteModal } from "@/components/admin/shared/DeleteModal";
import { menuItems } from "@/components/layout/navbar/navbar.constants";
import { useCrud } from "@/hooks/useCrud";
import CategoryList from "@/components/admin/categories/CategoryList";
import ProductsList from "@/components/admin/products/ProductsList";
import { Category, categoryService } from "@/services/categoryService";
import { Product, productService } from "@/services/productService";
import CreateUpdateCategoryModal from "@/components/admin/categories/modals/CreateUpdateCategoryModal";
import CreateUpdateProductModal from "@/components/admin/products/modals/CreateUpdateProductModal";

const { Content } = Layout;

export default function Admin() {
  // Categories
  const { data: categories, loading: getCategoriesLoading, execute:fetchCategories} = useCrud<Category[]>(categoryService.getAllCategories);
  const { data: category, loading: getCategoryLoading, execute: fetchCategory } = useCrud<Category | null>(categoryService.getCategoryById);
  const { execute: updateCategory, loading: loadingUpdateCategory } = useCrud(categoryService.updateCategory)
  const { execute: deleteCategory, loading: loadingDeleteCategory } = useCrud(categoryService.deleteCategory)
  const { execute: createCategory, loading: loadingCreateCategory } = useCrud(categoryService.createCategory)
  const isLoadingCategories = useMemo(() => getCategoriesLoading || getCategoryLoading || loadingUpdateCategory || loadingDeleteCategory || loadingCreateCategory, [getCategoriesLoading, getCategoryLoading, loadingUpdateCategory, loadingDeleteCategory, loadingCreateCategory]);

  // Products
  const { data: products, loading: getProductsLoading, execute:fetchProducts} = useCrud<Product[]>(productService.getAllProducts);
  const { data: product, loading: getProductLoading, execute: fetchProduct } = useCrud<Product | null>(productService.getProductById);
  const { execute: updateProduct, loading: loadingUpdateProduct } = useCrud(productService.updateProduct)
  const { execute: deleteProduct, loading: loadingDeleteProduct } = useCrud(productService.deleteProduct)
  const { execute: createProduct, loading: loadingCreateProduct } = useCrud(productService.createProduct)
  const isLoadingProducts = useMemo(() => getProductsLoading || getProductLoading || loadingUpdateProduct || loadingDeleteProduct || loadingCreateProduct, [getProductsLoading, getProductLoading, loadingUpdateProduct, loadingDeleteProduct, loadingCreateProduct]);
  
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { option = "categorias" } = useParams<{ option?: string }>();

  // Configuración de las opciones del admin
  const adminOptions = [
    { id: "categorias", name: "Categorías", icon: "tags" },
    { id: "productos", name: "Productos", icon: "shopping" },
    { id: "contacto", name: "Contacto", icon: "phone" },
    { id: "nosotros", name: "Nosotros", icon: "info" },
  ];
  // Obtener la opción actual
  const currentOption = adminOptions.find(opt => opt.id === option) || adminOptions[0];

  // Categories Consts
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [deleteCategoryObject, setDeleteCategoryObject] = useState<Category | null>(null);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  // Products Consts
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [deleteProductObject, setDeleteProductObject] = useState<Product | null>(null);
  const [deleteProductModal, setDeleteProductModal] = useState(false);

  useEffect(() => {
    // Cargar datos según la opción actual
    if (currentOption.id === "categorias") {
      fetchCategories();
    } else if (currentOption.id === "productos") {
      fetchProducts();
    }
    // Para contacto y nosotros no necesitas fetch ya que usan estado local
  }, [currentOption.id]);

  // Categories handlers
  const handleUpdateCategory = async (id: number) => {
    await fetchCategory(id);
    setUpdateCategoryModal(true);
  }
  const confirmUpdateCategory = async (id: number | string | undefined, body: Category) => {
    setUpdateCategoryModal(false);
    await updateCategory(id, body);
    fetchCategories();
  }
  const handleDeleteCategory = async (category: Category) => {
    setDeleteCategoryObject(category);
    setDeleteCategoryModal(true);
  }
  const confirmDeleteCategory = async (id: number | string) => {
    setDeleteCategoryModal(false);
    await deleteCategory(id);
    fetchCategories();
  }
  const handleCreateCategory = () => {
    setCreateCategoryModal(true);
  }
  const confirmCreateCategory = async (body: Category) => {
    setCreateCategoryModal(false);
    await createCategory(body);
    fetchCategories();
  }
  const handleCategorySubmit = (id: number | string | undefined, values: any) => {
    if (id) {
      confirmUpdateCategory(id, values);
    } else {
      confirmCreateCategory(values);
    }
  }

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

  // const handleAgregarParrafo = () => {
  //   const nuevoKey = `parrafo${nosotros.length + 1}`;
  //   setNosotros([
  //     ...nosotros,
  //     { key: nuevoKey, label: `Párrafo ${nosotros.length + 1}`, value: "" }
  //   ]);
  //   setNosotrosCampoEdit(nuevoKey);
  //   setNosotrosModalOpen(true);
  // };

  // // Para eliminar un párrafo
  // const handleEliminarParrafo = (key: string) => {
  //   setNosotros(nosotros.filter(item => item.key !== key));
  // };

  const renderCurrentStep = () => {
        switch (currentOption.id) {
            case "categorias":
              if (isLoadingCategories || !categories || categories.length === 0) {
                return (
                  <div style={{ padding: isMobile ? "16px" : "32px" }}>
                    <Progress percent={50} status="active" showInfo={false} />
                  </div>
                );
              } else {
                return (
                  <Suspense fallback={<Progress percent={50} status="active" showInfo={false} />}>
                    <CategoryList 
                      categories={categories}
                      onEdit={handleUpdateCategory}
                      onDelete={handleDeleteCategory}
                      adminStyles={adminStyles}
                      onCreate={handleCreateCategory}
                      isMobile={isMobile}
                    />
                  </Suspense>
                );
              }
            case "productos":
              if (isLoadingProducts || !products || products.length === 0) {
                return (
                  <div style={{ padding: isMobile ? "16px" : "32px" }}>
                    <Progress percent={50} status="active" showInfo={false} />
                  </div>
                );
              } else {
                return (
                  <Suspense fallback={<Progress percent={50} status="active" showInfo={false} />}>
                    <ProductsList 
                      products={products}
                      onEdit={handleUpdateProduct}
                      onDelete={handleDeleteProduct}
                      adminStyles={adminStyles}
                      onCreate={handleCreateProduct}
                      isMobile={isMobile}
                    />
                  </Suspense>
                );
              }
            default:
                return null;
        }
    };


//   } else if (option === "carousel") {
//     content = (
//       <div style={{ padding: isMobile ? "16px" : "32px" }}>
//         <h3 style={adminStyles.menuTitle}>Carousel</h3>
//         <p>Gestión de imágenes del carousel (pendiente).</p>
//       </div>
//     );
//   } else if (option === "carouselMobile") {
//     content = (
//       <div style={{ padding: isMobile ? "16px" : "32px" }}>
//         <h3 style={adminStyles.menuTitle}>Carousel Mobile</h3>
//         <p>Gestión de imágenes del carousel mobile (pendiente).</p>
//       </div>
//     );
//   } else if (option === "contacto") {
//     content = isMobile
//       ? (
//         <RenderMobileList
//           title="Contacto"
//           items={contacto}
//           getTitle={item => item.label}
//           getDescription={item => item.value}
//           getPrice={null}
//           getImage={null}
//           defaultIcon={null}
//           onEdit={(item) => {
//             setContactoCampoEdit(item.key); // Editar campo individual
//             setContactoModalOpen(true);
//           }}
//           adminStyles={adminStyles}
//         />
//       )
//       : (
//         <RenderDesktopList
//           title="Contacto"
//           items={contacto}
//           columns={() => [
//             { title: "Campo", dataIndex: "label", key: "label" },
//             { title: "Valor", dataIndex: "value", key: "value" }
//           ]}
//           onEdit={() => {
//             setContactoCampoEdit(null); // Editar todos los campos
//             setContactoModalOpen(true);
//           }}
//           onDelete={() => { }}
//           adminStyles={adminStyles}
//           createButtonText="Editar contacto"
//         />
//       );
//   } else if (option === "nosotros") {
//     content = isMobile
//       ? (
//         <RenderMobileList
//           title="Nosotros"
//           items={nosotros}
//           getTitle={item => item.label}
//           getDescription={item => item.value}
//           getPrice={null}
//           getImage={null}
//           defaultIcon={null}
//           onEdit={item => {
//             setNosotrosCampoEdit(item.key);
//             setNosotrosModalOpen(true);
//           }}
//           onDelete={item => handleEliminarParrafo(item.key)}
//           adminStyles={adminStyles}
//           imagePreview={
//             <div style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginBottom: 16
//             }}>
//               <img
//                 src={nosotrosImage}
//                 alt="Imagen de Nosotros"
//                 style={{
//                   width: 120,
//                   height: 80,
//                   objectFit: "cover",
//                   borderRadius: 8,
//                   display: "block"
//                 }}
//               />
//               <Button
//                 type="text"
//                 size="large"
//                 icon={<EditOutlined />}
//                 style={{ color: "#1890ff", marginTop: 8 }}
//                 onClick={() => setNosotrosImageModalOpen(true)}
//               >
//                 Editar imagen
//               </Button>
//             </div>
//           }
//         />
//       )
//       : (
//         <RenderDesktopList
//           title="Nosotros"
//           items={nosotros}
//           columns={() => [
//             { title: "Campo", dataIndex: "label", key: "label" },
//             { title: "Valor", dataIndex: "value", key: "value" },
//             {
//               title: "Acciones",
//               key: "acciones",
//               render: (_: any, record: NosotrosItem) => (
//                 <Space>
//                   <Button type="link" onClick={() => {
//                     setNosotrosCampoEdit(record.key);
//                     setNosotrosModalOpen(true);
//                   }}>
//                     Editar
//                   </Button>
//                   <Button type="link" danger onClick={() => handleEliminarParrafo(record.key)}>
//                     Eliminar
//                   </Button>
//                 </Space>
//               ),
//             }
//           ]}
//           onEdit={() => handleAgregarParrafo()}
//           onDelete={() => { }}
//           adminStyles={adminStyles}
//           createButtonText="Agregar párrafo"
//           imagePreview={
//             <div style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginBottom: 16
//             }}>
//               <img
//                 src={nosotrosImage}
//                 alt="Imagen de Nosotros"
//                 style={{
//                   width: 120,
//                   height: 80,
//                   objectFit: "cover",
//                   borderRadius: 8,
//                   display: "block"
//                 }}
//               />
//               <Button
//                 type="text"
//                 size="large"
//                 icon={<EditOutlined />}
//                 style={{ color: "#1890ff", marginTop: 8 }}
//                 onClick={() => setNosotrosImageModalOpen(true)}
//               >
//                 Editar imagen
//               </Button>
//             </div>
//           }
//         />
//       );
//   }

  return (
    <div style={adminStyles.container}>
      <Layout style={adminStyles.layout(isMobile)}>
        {!isMobile && (
          <Layout.Sider width={220} style={{ background: "#222" }}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[option]}
              onClick={(item: { key: string }) => {
                navigate(`/admin/${item.key}`);
              }}
              items={menuItems}
              style={adminStyles.menuSidebar}
            />
          </Layout.Sider>
        )}
        <Content style={adminStyles.contentContainer(isMobile)}>
          {renderCurrentStep()}
        </Content>

        {/* Mobile Floating Action Button */}

        {/* {isMobile && (option === "categorias" || option === "productos" || option === "nosotros") && (
          <FloatButton
            icon={<PlusOutlined />}
            type="primary"
            style={adminStyles.createItemFloatButton}
            onClick={() => {
              if (option === "categorias") {
                setCatEdit(null);
                setCatModalOpen(true);
                setCatImage("");
              } else if (option === "productos") {
                setProdEdit(null);
                setProdModalOpen(true);
                setProdImage("");
              } else if (option === "nosotros") {
                const nuevoKey = `parrafo${nosotros.length + 1}`;
                setNuevoParrafoKey(nuevoKey);
                setNosotrosCampoEdit(nuevoKey);
                setNosotrosModalOpen(true);
              }
            }}
          />
        )} */}
      </Layout>
      {/* Modales */}
      {/* Categories Modals */}
      {updateCategoryModal && category && (
        <CreateUpdateCategoryModal 
          open={updateCategoryModal}
          onCancel={() => {
            setUpdateCategoryModal(false)
          }}
          onSubmit={handleCategorySubmit}
          isMobile={isMobile}
          adminStyles={adminStyles}
          category={category}
          loading={getCategoryLoading}
        />
      )}
      {createCategoryModal && (
        <CreateUpdateCategoryModal 
          open={createCategoryModal}
          onCancel={() => {
            setCreateCategoryModal(false)
          }}
          onSubmit={handleCategorySubmit}
          isMobile={isMobile}
          adminStyles={adminStyles}
        />
      )}
      {deleteCategoryModal && (
        <DeleteModal
          open={deleteCategoryModal}
          title="¿Eliminar categoría?"
          message={deleteCategoryObject ? `¿Seguro que quieres eliminar la categoría "${deleteCategoryObject.name}"?` : ""}
          onCancel={() => setDeleteCategoryObject(null)}
          onDelete={() => {
            if (deleteCategoryObject) confirmDeleteCategory(deleteCategoryObject.id);
            setDeleteCategoryObject(null);
          }}
        />
      )}
      {/* Products Modals */}
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
          onCancel={() => setDeleteProductObject(null)}
          onDelete={() => {
            if (deleteProductObject) confirmDeleteProduct(deleteProductObject.id);
            setDeleteProductObject(null);
          }}
        />
      )}
    </div>
  );
}