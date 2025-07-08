import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import 'antd/dist/reset.css'
import './main.less'
import { App as AntdApp } from 'antd'
import { AuthProvider } from './Providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AntdApp>
        <AppRoutes />
      </AntdApp>
    </AuthProvider>
  </React.StrictMode>
)
