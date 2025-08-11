import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu, ConfigProvider } from 'antd'
import { Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import { theme } from '@/theme'
import '@/App.css'

const { Header, Content } = Layout

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: '20px', marginRight: '40px' }}>
            Nano-Shop
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
            items={[
              {
                key: 'home',
                label: <Link to="/">Home</Link>,
              },
              // Add more menu items as you create microfrontends
              // {
              //   key: 'products',
              //   label: <Link to="/products">Products</Link>,
              // },
            ]}
          />
        </Header>
        <Content style={{ padding: '20px' }}>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <div>
                      <h1>Welcome to Nano-Shop</h1>
                      <p>Shell application ready for microfrontends</p>
                    </div>
                  } 
                />
                {/* Add routes for microfrontends here */}
                {/* 
                <Route path="/products/*" element={<ProductsApp />} />
                */}
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Content>
      </Layout>
    </Router>
    </ConfigProvider>
  )
}

export default App
