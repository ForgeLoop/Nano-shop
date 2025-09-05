import { Modal, Button } from "antd";

export function DeleteModal({ open, title, message, onCancel, onDelete }) {
  return (
    <Modal
      centered
      open={open}
      title={title}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" danger onClick={onDelete}>
          Eliminar
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
}