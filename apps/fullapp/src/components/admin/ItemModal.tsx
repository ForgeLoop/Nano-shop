import { Modal, Form, Input, Button, Upload, Select, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

// Define el tipo para los campos del formulario
export type Field = {
  type: "input" | "select";
  name: string;
  label: string;
  rules?: any[];
  inputType?: string;
  placeholder?: string;
};

// Define el tipo de las props del modal
type ItemModalProps = {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  initialValues: any;
  fields: Field[];
  image: string | null;
  setImage: (img: string) => void;
  beforeUpload: (file: File, setImage: (img: string) => void) => boolean;
  isMobile: boolean;
  adminStyles: any;
  isEdit: boolean;
  title: string;
  categories?: { nombre: string }[]; // Solo para productos
};

export function ItemModal({
  open,
  onCancel,
  onFinish,
  initialValues,
  fields,
  image,
  setImage,
  beforeUpload,
  isMobile,
  adminStyles,
  isEdit,
  title,
  categories = [],
}: ItemModalProps) {
  // Solo muestra el campo de imagen si existe en fields
  const showImageField = fields.some((f) => f.name === "imagen");

  return (
    <Modal
      centered
      open={open}
      title={<div style={{ textAlign: "center", width: "100%" }}>{title}</div>}
      onCancel={onCancel}
      footer={null}
      width={isMobile ? "90%" : 520}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Form
          initialValues={initialValues}
          onFinish={onFinish}
          layout="vertical"
          style={{ width: "100%", maxWidth: 400 }}
        >
          {fields.map((field) => {
            if (field.type === "input") {
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  style={{ textAlign: "center" }}
                >
                  <Input type={field.inputType || "text"} />
                </Form.Item>
              );
            }
            if (field.type === "select") {
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  style={{ textAlign: "center" }}
                >
                  <Select
                    placeholder={field.placeholder}
                    options={categories.map((cat) => ({
                      value: cat.nombre,
                      label: cat.nombre,
                    }))}
                  />
                </Form.Item>
              );
            }
            return null;
          })}
          <Form.Item style={{ textAlign: "center" }}>
            <div style={{ width: "100%", textAlign: "center", fontWeight: 500, marginBottom: 8 }}>
              Imagen
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => beforeUpload(file, setImage)}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
              </Upload>
              {image && (
                <div style={{ marginTop: 12 }}>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt="preview"
                    style={adminStyles.formAddImage}
                  />
                </div>
              )}
            </div>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button style={adminStyles.createItemButton} htmlType="submit">
              {isEdit ? "Guardar cambios" : "Crear"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}