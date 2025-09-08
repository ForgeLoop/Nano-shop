import { useState } from "react";
import {
  Button,
  FloatButton,
  Image,
  Layout, Menu, message,
  Space
} from "antd";
import { EditOutlined, PlusOutlined, ShoppingOutlined, TagsOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useIsMobile } from "../hooks/useWindowSize";
import { adminStyles } from "./pages.styles";
import RenderMobileList from "../components/admin/RenderMobileList";
import RenderDesktopList from "../components/admin/RenderDesktopList";
import { categoryColumns } from "../components/admin/categoryColums";
import { productColumns } from "../components/admin/productColumns";
import { DeleteModal } from "../components/admin/DeleteModal";
import { menuItems } from "../components/navbar/navbar.constants";
import { ItemModal } from "../components/admin/ItemModal";
import { contactoFields, initialContacto, initialNosotros, nosotrosFields, NosotrosItem, categoryFields, productFields, initialCategories, initialProducts, Category, Product } from "../components/admin/admin.constants";


const { Content } = Layout;

export default function Admin() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { option = "categorias" } = useParams<{ option?: string }>();
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [contacto, setContacto] = useState(initialContacto);
  const [nosotros, setNosotros] = useState<NosotrosItem[]>([...initialNosotros]);

  // Modales y estados
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [catEdit, setCatEdit] = useState<Category | null>(null);
  const [ catImage, setCatImage] = useState("");
  const [prodModalOpen, setProdModalOpen] = useState(false);
  const [prodEdit, setProdEdit] = useState<Product | null>(null);
  const [prodImage, setProdImage] = useState("");
  const [catDelete, setCatDelete] = useState<Category | null>(null);
  const [prodDelete, setProdDelete] = useState<Product | null>(null);
  const [contactoModalOpen, setContactoModalOpen] = useState(false);
  const [contactoCampoEdit, setContactoCampoEdit] = useState<string | null>(null);
  const [nosotrosModalOpen, setNosotrosModalOpen] = useState(false);
  const [nosotrosCampoEdit, setNosotrosCampoEdit] = useState<string | null>(null);
  const [nosotrosImage, setNosotrosImage] = useState<string>("/local.jpeg");
  const [nosotrosImageModalOpen, setNosotrosImageModalOpen] = useState(false);
  const [nuevoParrafoKey, setNuevoParrafoKey] = useState<string | null>(null);


  // Imagen Upload
  const beforeUpload = (file: File, setImage: (url: string) => void) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Solo se permiten imágenes.");
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
    return false;
  };

  // Categorías
  const handleCatSave = (values: { nombre: string }) => {
    const imagen = catImage;
    if (catEdit) {
      setCategories(categories.map((c) => (c.key === catEdit.key ? { ...c, nombre: values.nombre, imagen } : c)));
    } else {
      setCategories([...categories, { key: Date.now().toString(), nombre: values.nombre, imagen }]);
    }
    setCatModalOpen(false);
    setCatEdit(null);
    setCatImage("");
  };
  const handleCatDelete = (key: string) => setCategories(categories.filter((c) => c.key !== key));

  // Productos
  const handleProdSave = (values: { nombre: string; categoria: string; precio: number }) => {
    const imagen = prodImage;
    if (prodEdit) {
      setProducts(products.map((p) => (p.key === prodEdit.key ? { ...p, ...values, imagen } : p)));
    } else {
      setProducts([...products, { key: Date.now().toString(), ...values, imagen }]);
    }
    setProdModalOpen(false);
    setProdEdit(null);
    setProdImage("");
  };
  const handleProdDelete = (key: string) => setProducts(products.filter((p) => p.key !== key));

  const handleContactoSave = (values) => {
    setContacto(values);
    setContactoModalOpen(false);
  };

  const handleAgregarParrafo = () => {
    const nuevoKey = `parrafo${nosotros.length + 1}`;
    setNosotros([
      ...nosotros,
      { key: nuevoKey, label: `Párrafo ${nosotros.length + 1}`, value: "" }
    ]);
    setNosotrosCampoEdit(nuevoKey);
    setNosotrosModalOpen(true);
  };

  // Para eliminar un párrafo
  const handleEliminarParrafo = (key: string) => {
    setNosotros(nosotros.filter(item => item.key !== key));
  };
  // --- Render contenido ---
  let content;
  if (option === "categorias") {
    content = isMobile
      ? (
        <RenderMobileList
          title="Categorías"
          items={categories}
          getTitle={cat => cat.nombre}
          getDescription={null}
          getPrice={null}
          getImage={cat => cat.imagen}
          defaultIcon={<TagsOutlined style={adminStyles.iconItem} />}
          onEdit={cat => {
            setCatEdit(cat);
            setCatModalOpen(true);
            setCatImage(cat.imagen || "");
          }}
          onDelete={cat => setCatDelete(cat)}
          adminStyles={adminStyles}
        />
      )
      : (
        <RenderDesktopList
          title="Categorías"
          items={categories}
          columns={() => categoryColumns(
            cat => {
              setCatEdit(cat);
              setCatModalOpen(true);
              setCatImage(cat?.imagen || "");
            },
            cat => setCatDelete(cat),
            adminStyles
          )}
          onEdit={cat => {
            setCatEdit(cat);
            setCatModalOpen(true);
            setCatImage(cat?.imagen || "");
          }}
          onDelete={cat => setCatDelete(cat)}
          adminStyles={adminStyles}
          createButtonText="Crear nueva categoría"
        />
      );
  } else if (option === "productos") {
    content = isMobile
      ? (
        <RenderMobileList
          title="Productos"
          items={products}
          getTitle={prod => prod.nombre}
          getDescription={prod => prod.categoria}
          getPrice={prod => `$${prod.precio}`}
          getImage={prod => prod.imagen}
          defaultIcon={<ShoppingOutlined style={adminStyles.iconItem} />}
          onEdit={prod => {
            setProdEdit(prod);
            setProdModalOpen(true);
            setProdImage(prod.imagen || "");
          }}
          onDelete={prod => setProdDelete(prod)}
          adminStyles={adminStyles}
        />
      )
      : (
        <RenderDesktopList
          title="Productos"
          items={products}
          columns={() => productColumns(
            prod => {
              setProdEdit(prod);
              setProdModalOpen(true);
              setProdImage(prod?.imagen || "");
            },
            prod => setProdDelete(prod),
            adminStyles
          )}
          onEdit={prod => {
            setProdEdit(prod);
            setProdModalOpen(true);
            setProdImage(prod?.imagen || "");
          }}
          onDelete={prod => setProdDelete(prod)}
          adminStyles={adminStyles}
          createButtonText="Crear nuevo producto"
        />
      );
  } else if (option === "carousel") {
    content = (
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        <h3 style={adminStyles.menuTitle}>Carousel</h3>
        <p>Gestión de imágenes del carousel (pendiente).</p>
      </div>
    );
  } else if (option === "carouselMobile") {
    content = (
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        <h3 style={adminStyles.menuTitle}>Carousel Mobile</h3>
        <p>Gestión de imágenes del carousel mobile (pendiente).</p>
      </div>
    );
  } else if (option === "contacto") {
    content = isMobile
      ? (
        <RenderMobileList
          title="Contacto"
          items={contacto}
          getTitle={item => item.label}
          getDescription={item => item.value}
          getPrice={null}
          getImage={null}
          defaultIcon={null}
          onEdit={(item) => {
            setContactoCampoEdit(item.key); // Editar campo individual
            setContactoModalOpen(true);
          }}
          adminStyles={adminStyles}
        />
      )
      : (
        <RenderDesktopList
          title="Contacto"
          items={contacto}
          columns={() => [
            { title: "Campo", dataIndex: "label", key: "label" },
            { title: "Valor", dataIndex: "value", key: "value" }
          ]}
          onEdit={() => {
            setContactoCampoEdit(null); // Editar todos los campos
            setContactoModalOpen(true);
          }}
          adminStyles={adminStyles}
          createButtonText="Editar contacto"
        />
      );
  } else if (option === "nosotros") {
    content = isMobile
      ? (
        <RenderMobileList
          title="Nosotros"
          items={nosotros}
          getTitle={item => item.label}
          getDescription={item => item.value}
          getPrice={null}
          getImage={null}
          defaultIcon={null}
          onEdit={item => {
            setNosotrosCampoEdit(item.key);
            setNosotrosModalOpen(true);
          }}
          onDelete={item => handleEliminarParrafo(item.key)}
          adminStyles={adminStyles}
          imagePreview={
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 16
            }}>
              <img
                src={nosotrosImage}
                alt="Imagen de Nosotros"
                style={{
                  width: 120,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block"
                }}
              />
              <Button
                type="text"
                size="large"
                icon={<EditOutlined />}
                style={{ color: "#1890ff", marginTop: 8 }}
                onClick={() => setNosotrosImageModalOpen(true)}
              >
                Editar imagen
              </Button>
            </div>
          }
        />
      )
      : (
        <RenderDesktopList
          title="Nosotros"
          items={nosotros}
          columns={({ onEdit, onDelete, adminStyles }) => [
            { title: "Campo", dataIndex: "label", key: "label" },
            { title: "Valor", dataIndex: "value", key: "value" },
            {
              title: "Acciones",
              key: "acciones",
              render: (_: any, record: NosotrosItem) => (
                <Space>
                  <Button type="link" onClick={() => {
                    setNosotrosCampoEdit(record.key);
                    setNosotrosModalOpen(true);
                  }}>
                    Editar
                  </Button>
                  <Button type="link" danger onClick={() => handleEliminarParrafo(record.key)}>
                    Eliminar
                  </Button>
                </Space>
              ),
            }
          ]}
          onEdit={() => handleAgregarParrafo()}
          adminStyles={adminStyles}
          createButtonText="Agregar párrafo"
          imagePreview={
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 16
            }}>
              <img
                src={nosotrosImage}
                alt="Imagen de Nosotros"
                style={{
                  width: 120,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block"
                }}
              />
              <Button
                type="text"
                size="large"
                icon={<EditOutlined />}
                style={{ color: "#1890ff", marginTop: 8 }}
                onClick={() => setNosotrosImageModalOpen(true)}
              >
                Editar imagen
              </Button>
            </div>
          }
        />
      );
  }

  return (
    <div style={adminStyles.container}>
      <Layout style={adminStyles.layout(isMobile)}>
        {/* Desktop Sidebar */}
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
          {content}
        </Content>

        {/* Mobile Floating Action Button */}

        {isMobile && (option === "categorias" || option === "productos" || option === "nosotros") && (
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
        )}
      </Layout>

      {/* Modales */}
      <ItemModal
        open={catModalOpen}
        onCancel={() => {
          setCatModalOpen(false);
          setCatEdit(null);
          setCatImage("");
        }}
        onFinish={handleCatSave}
        initialValues={catEdit || { nombre: "" }}
        fields={categoryFields}
        image={catImage}
        setImage={setCatImage}
        beforeUpload={beforeUpload}
        isMobile={isMobile}
        adminStyles={adminStyles}
        isEdit={!!catEdit}
        title={catEdit ? "Editar categoría" : "Crear categoría"}
        categories={categories}
      />

      <ItemModal
        open={prodModalOpen}
        onCancel={() => {
          setProdModalOpen(false);
          setProdEdit(null);
          setProdImage("");
        }}
        onFinish={handleProdSave}
        initialValues={prodEdit || { nombre: "", categoria: "", precio: "" }}
        fields={productFields}
        image={prodImage}
        setImage={setProdImage}
        beforeUpload={beforeUpload}
        isMobile={isMobile}
        adminStyles={adminStyles}
        isEdit={!!prodEdit}
        title={prodEdit ? "Editar producto" : "Crear producto"}
        categories={categories}
      />

      <ItemModal
        open={contactoModalOpen}
        onCancel={() => {
          setContactoModalOpen(false);
          setContactoCampoEdit(null);
        }}
        onFinish={(values) => {
          if (contactoCampoEdit) {
            // Editar solo un campo
            setContacto(contacto.map(item =>
              item.key === contactoCampoEdit
                ? { ...item, value: values[contactoCampoEdit!] }
                : item
            ));
          } else {
            // Editar todos los campos
            setContacto(contacto.map(item =>
              values[item.key] !== undefined
                ? { ...item, value: values[item.key] }
                : item
            ));
          }
          setContactoModalOpen(false);
          setContactoCampoEdit(null);
        }}
        initialValues={
          contactoCampoEdit
            ? { [contactoCampoEdit]: contacto.find(item => item.key === contactoCampoEdit)?.value }
            : contacto.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {})
        }
        fields={
          contactoCampoEdit
            ? [contactoFields.find(f => f.name === contactoCampoEdit)!]
            : contactoFields
        }
        image={null}
        setImage={() => { }}
        beforeUpload={() => false}
        isMobile={isMobile}
        adminStyles={adminStyles}
        isEdit={true}
        title={
          contactoCampoEdit
            ? `Editar ${contactoFields.find(f => f.name === contactoCampoEdit)?.label || ""}`
            : "Editar contacto"
        }
        categories={[]}
      />

      <ItemModal
        open={nosotrosModalOpen}
        onCancel={() => {
          setNosotrosModalOpen(false);
          setNosotrosCampoEdit(null);
        }}
        onFinish={values => {
          setNosotros(nosotros.map(item =>
            item.key === nosotrosCampoEdit
              ? { ...item, value: values[nosotrosCampoEdit!] }
              : item
          ));
          setNosotrosModalOpen(false);
          setNosotrosCampoEdit(null);
        }}
        initialValues={
          nosotrosCampoEdit
            ? { [nosotrosCampoEdit]: nosotros.find(item => item.key === nosotrosCampoEdit)?.value }
            : {}
        }
        fields={
          nosotrosCampoEdit
            ? [{
              type: "input",
              name: nosotrosCampoEdit,
              label: nosotros.find(item => item.key === nosotrosCampoEdit)?.label || "",
              rules: [{ required: true, message: "Ingrese el párrafo" }]
            }]
            : []
        }
        image={null}
        setImage={() => { }}
        beforeUpload={() => false}
        isMobile={isMobile}
        adminStyles={adminStyles}
        isEdit={true}
        title={
          nosotrosCampoEdit
            ? `Editar ${nosotros.find(item => item.key === nosotrosCampoEdit)?.label || ""}`
            : "Agregar párrafo"
        }
        categories={[]}
      />

      <ItemModal
        open={nosotrosModalOpen}
        onCancel={() => {
          setNosotrosModalOpen(false);
          setNosotrosCampoEdit(null);
          setNuevoParrafoKey(null);
        }}
        onFinish={values => {
          if (nuevoParrafoKey) {
            setNosotros([
              ...nosotros,
              { key: nuevoParrafoKey, label: `Párrafo ${nosotros.length + 1}`, value: values[nuevoParrafoKey] }
            ]);
          } else {
            setNosotros(nosotros.map(item =>
              item.key === nosotrosCampoEdit
                ? { ...item, value: values[nosotrosCampoEdit!] }
                : item
            ));
          }
          setNosotrosModalOpen(false);
          setNosotrosCampoEdit(null);
          setNuevoParrafoKey(null);
        }}
        initialValues={
          nosotrosCampoEdit
            ? { [nosotrosCampoEdit]: nosotros.find(item => item.key === nosotrosCampoEdit)?.value || "" }
            : {}
        }
        fields={
          nosotrosCampoEdit
            ? [{
              type: "input",
              name: nosotrosCampoEdit,
              label: `Párrafo ${nosotrosCampoEdit.replace("parrafo", "")}`,
              rules: [{ required: true, message: "Ingrese el párrafo" }]
            }]
            : []
        }
        image={null}
        setImage={() => { }}
        beforeUpload={() => false}
        isMobile={isMobile}
        adminStyles={adminStyles}
        isEdit={true}
        title={
          nuevoParrafoKey
            ? "Agregar párrafo"
            : `Editar ${nosotros.find(item => item.key === nosotrosCampoEdit)?.label || ""}`
        }
        categories={[]}
      />

      <DeleteModal
        open={!!catDelete}
        title="¿Eliminar categoría?"
        message={catDelete ? `¿Seguro que quieres eliminar la categoría "${catDelete.nombre}"?` : ""}
        onCancel={() => setCatDelete(null)}
        onDelete={() => {
          if (catDelete) handleCatDelete(catDelete.key);
          setCatDelete(null);
        }}
      />

      <DeleteModal
        open={!!prodDelete}
        title="¿Eliminar producto?"
        message={prodDelete ? `¿Seguro que quieres eliminar el producto "${prodDelete.nombre}"?` : ""}
        onCancel={() => setProdDelete(null)}
        onDelete={() => {
          if (prodDelete) handleProdDelete(prodDelete.key);
          setProdDelete(null);
        }}
      />
    </div>
  );
}