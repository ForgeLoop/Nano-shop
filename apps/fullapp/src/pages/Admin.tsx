import { useState } from "react"
import {
  Layout,
  Menu,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  Typography,
  Upload,
  message,
  Card,
  Row,
  Col,
  Drawer,
  FloatButton,
} from "antd"
import {
  TagsOutlined,
  ShoppingOutlined,
  PictureOutlined,
  MobileOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useIsMobile } from "../hooks/useWindowSize"

const { Content } = Layout
const { Title, Text } = Typography

type Category = { key: string; nombre: string; imagen: string }
type Product = { key: string; nombre: string; categoria: string; precio: number; imagen: string }

const initialCategories: Category[] = [
  { key: "1", nombre: "Celulares", imagen: "" },
  { key: "2", nombre: "Auriculares", imagen: "" },
  { key: "3", nombre: "Accesorios", imagen: "" },
]

const initialProducts: Product[] = [
  { key: "1", nombre: "iPhone 14 Pro", categoria: "Celulares", precio: 1200, imagen: "" },
  { key: "2", nombre: "AirPods Pro", categoria: "Auriculares", precio: 250, imagen: "" },
]

export default function AdminMobile() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { option = "categorias" } = useParams<{ option?: string }>()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Modal para crear/editar categoría
  const [catModalOpen, setCatModalOpen] = useState(false)
  const [catEdit, setCatEdit] = useState<Category | null>(null)
  const [catImage, setCatImage] = useState("")

  // Modal para crear/editar producto
  const [prodModalOpen, setProdModalOpen] = useState(false)
  const [prodEdit, setProdEdit] = useState<Product | null>(null)
  const [prodImage, setProdImage] = useState("")

  // Modal de confirmación de eliminación
  const [catDelete, setCatDelete] = useState<Category | null>(null)
  const [prodDelete, setProdDelete] = useState<Product | null>(null)

  // --- Imagen Upload ---
  const beforeUpload = (file: File, setImage: (url: string) => void) => {
    const isImage = file.type.startsWith("image/")
    if (!isImage) {
      message.error("Solo se permiten imágenes.")
      return false
    }
    const reader = new FileReader()
    reader.onload = (e) => setImage(e.target?.result as string)
    reader.readAsDataURL(file)
    return false
  }

  // --- Categorías ---
  const handleCatSave = (values: { nombre: string }) => {
    const imagen = catImage
    if (catEdit) {
      setCategories(categories.map((c) => (c.key === catEdit.key ? { ...c, nombre: values.nombre, imagen } : c)))
    } else {
      setCategories([...categories, { key: Date.now().toString(), nombre: values.nombre, imagen }])
    }
    setCatModalOpen(false)
    setCatEdit(null)
    setCatImage("")
  }

  const handleCatDelete = (key: string) => setCategories(categories.filter((c) => c.key !== key))

  // --- Productos ---
  const handleProdSave = (values: { nombre: string; categoria: string; precio: number }) => {
    const imagen = prodImage
    if (prodEdit) {
      setProducts(products.map((p) => (p.key === prodEdit.key ? { ...p, ...values, imagen } : p)))
    } else {
      setProducts([...products, { key: Date.now().toString(), ...values, imagen }])
    }
    setProdModalOpen(false)
    setProdEdit(null)
    setProdImage("")
  }

  const handleProdDelete = (key: string) => setProducts(products.filter((p) => p.key !== key))

  // --- Panel lateral ---
  const menuItems = [
        { key: "carousel", icon: <PictureOutlined />, label: "Carousel" },
        { key: "carouselMobile", icon: <MobileOutlined />, label: "Carousel Mobile" },
        { key: "categorias", icon: <TagsOutlined />, label: "Categorías" },
        { key: "productos", icon: <ShoppingOutlined />, label: "Productos" },
  ]

  // Renderizado mobile para categorías
  const renderMobileCategories = () => (
    <div style={{ padding: "16px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Categorías
      </Title>

      <Row gutter={[16, 16]}>
        {categories.map((category) => (
          <Col span={24} key={category.key}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              bodyStyle={{ padding: "16px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {category.imagen ? (
                  <img
                    src={category.imagen || "/placeholder.svg"}
                    alt={category.nombre}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <TagsOutlined style={{ fontSize: "24px", color: "#999" }} />
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <Text strong style={{ fontSize: "16px" }}>
                    {category.nombre}
                  </Text>
                </div>

                <Space>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setCatEdit(category)
                      setCatModalOpen(true)
                      setCatImage(category.imagen || "")
                    }}
                    style={{ color: "#1890ff" }}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => setCatDelete(category)}
                    style={{ color: "#ff4d4f" }}
                  />
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )

  // Renderizado mobile para productos
  const renderMobileProducts = () => (
    <div style={{ padding: "16px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Productos
      </Title>

      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col span={24} key={product.key}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              bodyStyle={{ padding: "16px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {product.imagen ? (
                  <img
                    src={product.imagen || "/placeholder.svg"}
                    alt={product.nombre}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ShoppingOutlined style={{ fontSize: "24px", color: "#999" }} />
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <Text strong style={{ fontSize: "16px", display: "block" }}>
                    {product.nombre}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "14px", display: "block" }}>
                    {product.categoria}
                  </Text>
                  <Text style={{ fontSize: "16px", color: "#52c41a", fontWeight: "600" }}>${product.precio}</Text>
                </div>

                <Space>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setProdEdit(product)
                      setProdModalOpen(true)
                      setProdImage(product.imagen || "")
                    }}
                    style={{ color: "#1890ff" }}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => setProdDelete(product)}
                    style={{ color: "#ff4d4f" }}
                  />
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )

  // Renderizado desktop (tabla original)
  const renderDesktopCategories = () => (
    <div style={{ padding: "32px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Categorías
      </Title>

      <Table
        dataSource={categories}
        columns={[
          {
            title: "Imagen",
            dataIndex: "imagen",
            key: "imagen",
            render: (img: string) =>
              img ? (
                <img
                  src={img || "/placeholder.svg"}
                  alt="cat"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : null,
          },
          { title: "Nombre", dataIndex: "nombre", key: "nombre" },
          {
            title: "Acciones",
            key: "acciones",
            render: (_: any, record: Category) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => {
                    setCatEdit(record)
                    setCatModalOpen(true)
                    setCatImage(record.imagen || "")
                  }}
                >
                  Editar
                </Button>
                <Button type="link" danger onClick={() => setCatDelete(record)}>
                  Eliminar
                </Button>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />
      <Button
        onClick={() => {
          setCatModalOpen(true)
          setCatImage("")
        }}
        style={{
          marginTop: 16,
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#555",
          boxShadow: "0 2px 8px rgba(85,85,85,0.25)",
          border: "none",
          color: "#fff",
        }}
      >
        Crear nueva categoría
      </Button>
    </div>
  )

  const renderDesktopProducts = () => (
    <div style={{ padding: "32px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Productos
      </Title>
      <Table
        dataSource={products}
        columns={[
          {
            title: "Imagen",
            dataIndex: "imagen",
            key: "imagen",
            render: (img: string) =>
              img ? (
                <img
                  src={img || "/placeholder.svg"}
                  alt="prod"
                  style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 8 }}
                />
              ) : null,
          },
          { title: "Nombre", dataIndex: "nombre", key: "nombre" },
          { title: "Categoría", dataIndex: "categoria", key: "categoria" },
          { title: "Precio", dataIndex: "precio", key: "precio", render: (v) => `$${v}` },
          {
            title: "Acciones",
            key: "acciones",
            render: (_: any, record: Product) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => {
                    setProdEdit(record)
                    setProdModalOpen(true)
                    setProdImage(record.imagen || "")
                  }}
                >
                  Editar
                </Button>
                <Button type="link" danger onClick={() => setProdDelete(record)}>
                  Eliminar
                </Button>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />
      <Button
        onClick={() => {
          setProdModalOpen(true)
          setProdImage("")
        }}
        style={{
          marginTop: 16,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#555",
          boxShadow: "0 2px 8px rgba(85,85,85,0.25)",
          border: "none",
          color: "#fff",
        }}
      >
        Crear nuevo producto
      </Button>
    </div>
  )

  // --- Render contenido ---
  let content
  if (option === "categorias") {
    content = isMobile ? renderMobileCategories() : renderDesktopCategories()
  } else if (option === "productos") {
    content = isMobile ? renderMobileProducts() : renderDesktopProducts()
  } else if (option === "carousel") {
    content = (
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Carousel
        </Title>
        <p>Gestión de imágenes del carousel (pendiente).</p>
      </div>
    )
  } else if (option === "carouselMobile") {
    content = (
      <div style={{ padding: isMobile ? "16px" : "32px" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Carousel Mobile
        </Title>
        <p>Gestión de imágenes del carousel mobile (pendiente).</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#444" }}>
      <Layout style={{ minHeight: "100vh", width: isMobile ? "100%" : "60%", margin: "0 auto" }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Layout.Sider width={220} style={{ background: "#222" }}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[option]}
              onClick={(item: { key: string }) => {
                navigate(`/admin/${item.key}`)
              }}
              items={menuItems}
              style={{
                height: "100%",
                borderRight: 0,
                fontSize: 16,
                backgroundColor: "#333",
                color: "#fff",
                paddingTop: 20,
              }}
            />
          </Layout.Sider>
        )}

        <Content
          style={{
            background: "#f4f4f4",
            maxWidth: isMobile ? "100vw" : "100%",
            overflowX: isMobile ? "hidden" : "visible",
            paddingBottom: isMobile ? "80px" : "0",
          }}
        >
          {content}
        </Content>

        {/* Mobile Floating Action Button */}
        {isMobile && (option === "categorias" || option === "productos") && (
          <FloatButton
            icon={<PlusOutlined />}
            type="primary"
            style={{
              right: 24,
              bottom: 24,
              width: 56,
              height: 56,
            }}
            onClick={() => {
              if (option === "categorias") {
                setCatModalOpen(true)
                setCatImage("")
              } else {
                setProdModalOpen(true)
                setProdImage("")
              }
            }}
          />
        )}
      </Layout>

      {/* Modales (sin cambios) */}
      <Modal
        centered
        open={catModalOpen}
        title={catEdit ? "Editar categoría" : "Crear categoría"}
        onCancel={() => {
          setCatModalOpen(false)
          setCatEdit(null)
          setCatImage("")
        }}
        footer={null}
        width={isMobile ? "90%" : 520}
      >
        <Form initialValues={catEdit || { nombre: "" }} onFinish={handleCatSave} layout="vertical">
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese el nombre" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Imagen">
            <Upload showUploadList={false} beforeUpload={(file) => beforeUpload(file, setCatImage)} accept="image/*">
              <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
            </Upload>
            {catImage && (
              <div style={{ marginTop: 12 }}>
                <img
                  src={catImage || "/placeholder.svg"}
                  alt="preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {catEdit ? "Guardar cambios" : "Crear"}
          </Button>
        </Form>
      </Modal>

      <Modal
        centered
        open={prodModalOpen}
        title={prodEdit ? "Editar producto" : "Crear producto"}
        onCancel={() => {
          setProdModalOpen(false)
          setProdEdit(null)
          setProdImage("")
        }}
        footer={null}
        width={isMobile ? "90%" : 520}
      >
        <Form
          initialValues={prodEdit || { nombre: "", categoria: "", precio: "" }}
          onFinish={handleProdSave}
          layout="vertical"
        >
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese el nombre" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categoria" label="Categoría" rules={[{ required: true, message: "Ingrese la categoría" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="precio" label="Precio" rules={[{ required: true, message: "Ingrese el precio" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Imagen">
            <Upload showUploadList={false} beforeUpload={(file) => beforeUpload(file, setProdImage)} accept="image/*">
              <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
            </Upload>
            {prodImage && (
              <div style={{ marginTop: 12 }}>
                <img
                  src={prodImage || "/placeholder.svg"}
                  alt="preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {prodEdit ? "Guardar cambios" : "Crear"}
          </Button>
        </Form>
      </Modal>

      <Modal
        centered
        open={!!catDelete}
        title="¿Eliminar categoría?"
        onCancel={() => setCatDelete(null)}
        footer={[
          <Button key="cancel" onClick={() => setCatDelete(null)}>
            Cancelar
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => {
              if (catDelete) handleCatDelete(catDelete.key)
              setCatDelete(null)
            }}
          >
            Eliminar
          </Button>,
        ]}
      >
        {catDelete && <p>¿Seguro que quieres eliminar la categoría "{catDelete.nombre}"?</p>}
      </Modal>

      <Modal
        centered
        open={!!prodDelete}
        title="¿Eliminar producto?"
        onCancel={() => setProdDelete(null)}
        footer={[
          <Button key="cancel" onClick={() => setProdDelete(null)}>
            Cancelar
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => {
              if (prodDelete) handleProdDelete(prodDelete.key)
              setProdDelete(null)
            }}
          >
            Eliminar
          </Button>,
        ]}
      >
        {prodDelete && <p>¿Seguro que quieres eliminar el producto "{prodDelete.nombre}"?</p>}
      </Modal>
    </div>
  )
}
