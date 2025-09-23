import { Modal, Form, Input, Button, Spin } from "antd";
import { useEffect } from "react";
import { Category } from "@/services/categoryService";

// Define el tipo de las props del modal
type CreateUpdateCategoryModalProps = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (id: number | string | undefined, values: any) => void;
  isMobile: boolean;
  adminStyles: any;
  category?: Category;
  loading?: boolean;
};

export default function CreateUpdateCategoryModal({
  open,
  onCancel,
  onSubmit,
  isMobile,
  adminStyles,
  category,
  loading = false,
}: CreateUpdateCategoryModalProps) {
  const title = category ? "Editar categoría" : "Crear categoría";
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && !loading) {
      if (category) {
        form.setFieldsValue({
          name: category.name,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, form, category, loading]);

  const handleSubmit = (values: any) => {
    if (category) {
      // Para edición: agregar valores no editables de la categoría original
      const completeValues = {
        ...values,
      };
      onSubmit(category?.id, completeValues);
    } else {
      onSubmit(undefined, values);
    }
    form.resetFields();
  }

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
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px" }}>Cargando categoría...</div>
          </div>
        ) : (
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{ width: "100%", maxWidth: 400 }}
          >
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "El nombre es requerido" }]}
            style={{ textAlign: "center" }}
          >
            <Input 
              placeholder="Ingresa el nombre de la categoría" 
              onFocus={(e) => e.target.select()}
            />
          </Form.Item>

          {/* <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: "La descripción es requerida" }]}
            style={{ textAlign: "center" }}
          >
            <Input.TextArea 
              placeholder="Ingresa la descripción de la categoría"
              rows={3}
            />
          </Form.Item> */}

          <Form.Item style={{ textAlign: "center" }}>
            <Button style={adminStyles.createItemButton} htmlType="submit">
              {category ? "Guardar cambios" : "Crear"}
            </Button>
          </Form.Item>
        </Form>
        )}
      </div>
    </Modal>
  );
}