import { useEffect } from 'react';
import { Card, Button, Spin, Alert, Empty, Row, Col, Typography, Tag } from 'antd';
import { useCrud } from '@/hooks/useCrud';
import { productService, type Product } from '@/services/productService';

const { Title, Text } = Typography;

const ProductList = () => {
  const { 
    data: products, 
    loading, 
    error, 
    execute: fetchProducts,
    isSuccess,
    isEmpty
  } = useCrud<Product[]>(productService.getAllProducts, {
    initialData: [],
    onSuccess: (data) => console.log('Productos cargados:', data),
    onError: (err) => console.error('Error al cargar productos:', err)
  });

  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p style={{ marginTop: '16px' }}>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error al cargar productos"
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={handleRefresh}>
            Reintentar
          </Button>
        }
        style={{ margin: '20px 0' }}
      />
    );
  }

  if (isEmpty) {
    return (
      <Empty
        description="No hay productos disponibles"
        style={{ margin: '50px 0' }}
      >
        <Button type="primary" onClick={handleRefresh}>
          Recargar
        </Button>
      </Empty>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Title level={3}>Productos desde la API</Title>
        <Button onClick={handleRefresh} loading={loading}>
          Recargar
        </Button>
      </div>

      {isSuccess && (
        <Text type="success" style={{ display: 'block', marginBottom: '16px' }}>
          ✅ {Array.isArray(products) ? products.length : 0} productos cargados exitosamente
        </Text>
      )}

      <Row gutter={[16, 16]}>
        {Array.isArray(products) ? products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              title={product.name}
              extra={<Text strong>${product.price.toFixed(2)}</Text>}
              actions={[
                <Tag color="blue" key="category">Categoría: {product.id_category}</Tag>
              ]}
            >
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Cliente:</strong> {product.id_client}</p>
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Creado:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
            </Card>
          </Col>
        )) : (
          <Col span={24}>
            <Card title="Respuesta de la API">
              <pre>{JSON.stringify(products, null, 2)}</pre>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProductList;