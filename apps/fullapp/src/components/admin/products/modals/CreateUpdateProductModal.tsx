import { Modal, Form, Input, Button, InputNumber, Spin } from "antd";
import { useEffect } from "react";
import { Product } from "@/services/productService";

// Define el tipo de las props del modal
type CreateUpdateProductModalProps = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (id: number | string | undefined, values: any) => void;
  isMobile: boolean;
  adminStyles: any;
  product?: Product;
  loading?: boolean;
};

export default function CreateUpdateProductModal({
  open,
  onCancel,
  onSubmit,
  isMobile,
  adminStyles,
  product,
  loading = false,
}: CreateUpdateProductModalProps) {
  const title = product ? "Editar producto" : "Crear producto";
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && !loading) {
      if (product) {
        form.setFieldsValue({
          name: product.name,
          price: product.price,
          description: product.description,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, form, product, loading]);

  const handleSubmit = (values: any) => {
    if (product) {
      // Para edición: agregar valores no editables del producto original
      const completeValues = {
        ...values,
        id_client: product.id_client,
        id_category: product.id_category,
      };
      onSubmit(product?.id, completeValues);
    } else {
      // Para creación: solo los valores del formulario
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
            <div style={{ marginTop: "16px" }}>Cargando producto...</div>
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
              placeholder="Ingresa el nombre del producto"
              onFocus={(e) => e.target.select()}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Precio"
            rules={[{ required: true, message: "El precio es requerido" }]}
            style={{ textAlign: "center" }}
          >
            <InputNumber
              placeholder="0.00"
              addonBefore="$"
              precision={2}
              min={0}
              controls={false}
              style={{ width: "100%", textAlign: "right" }}
              onFocus={(e) => e.target.select()}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: "La descripción es requerida" }]}
            style={{ textAlign: "center" }}
          >
            <Input.TextArea 
              placeholder="Ingresa la descripción del producto"
              rows={3}
              onFocus={(e) => e.target.select()}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button style={adminStyles.createItemButton} htmlType="submit">
              {product ? "Guardar cambios" : "Crear"}
            </Button>
          </Form.Item>
        </Form>
        )}
      </div>
    </Modal>
  );
}