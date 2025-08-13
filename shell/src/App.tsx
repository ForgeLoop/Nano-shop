import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, ConfigProvider, Switch } from 'antd';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { lightTheme, darkTheme } from '@/theme';
import '@/App.css';
import RemoteFullAppLoader from './components/FullApp';

const { Header, Content } = Layout;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          {/* <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: darkMode ? darkTheme.components.Layout.headerBg : lightTheme.components.Layout.headerBg,
            }}
          >
            <div style={{ color: darkMode ? darkTheme.token.colorWhite : lightTheme.token.colorWhite, fontSize: 20, marginRight: 40 }}>
              ForgeLoop
            </div>

            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              style={{ marginRight: 20 }}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
            <Menu
              theme={darkMode ? 'dark' : 'light'}
              mode="horizontal"
              style={{
                flex: 1,
                minWidth: 0,
                backgroundColor: darkMode ? darkTheme.components.Layout.headerBg : lightTheme.components.Layout.headerBg
              }}
              items={[
                {
                  key: 'home',
                  label: <Link to="/">Home</Link>,
                },
              ]}
            />
          </Header> */}

          <Content>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                          <RemoteFullAppLoader />
                        </Suspense>
                      </ErrorBoundary>
                    }
                  />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
