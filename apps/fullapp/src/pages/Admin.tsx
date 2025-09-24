import { Suspense } from "react";
import {
  Layout, 
  Menu,
  Progress,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/useWindowSize";
import { adminStyles } from "@/pages/pages.styles";
import { menuItems } from "@/components/layout/navbar/navbar.constants";
import CategoryView from "@/components/admin/categories/CategoryView";
import ProductsView from "@/components/admin/products/ProductsView";

const { Content } = Layout;

export default function Admin() {
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

  const renderCurrentStep = () => {
    switch (currentOption.id) {
      case "categorias":
        return (
          <Suspense fallback={<Progress percent={50} status="active" showInfo={false} />}>
            <CategoryView />
          </Suspense>
        );
      case "productos":
        return (
          <Suspense fallback={<Progress percent={50} status="active" showInfo={false} />}>
            <ProductsView />
          </Suspense>
        );
      default:
          return null;
    }
  };

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
    </div>
  );
}