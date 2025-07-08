import { useEffect, useState } from 'react'
import api from '../services/api'
import HeaderHome from './Header/HeaderHome/HeaderHome'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  LogoutOutlined,
  CreditCardOutlined,
  WalletOutlined
} from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'
import GeneralVision from './GeneralVision/GeneralVision'
import AccountsPayable from './AccountsPayable/AccountsPayable'
import AccountsReceivable from './AccountsReceivable/AccountsReceivable'
import { useAuth } from '../Providers/AuthProvider'
import { useNavigate } from 'react-router-dom'

function Home() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState(['1'])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/auth/teste/ping')

        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const renderContent = () => {
    switch (selectedKeys[0]) {
      case '1':
        return <GeneralVision />
      case '2':
        return <AccountsPayable />
      case '3':
        return <AccountsReceivable />
      case '4':
        return null
      default:
        return null
    }
  }

  return (
    <>
      <Layout>
        <HeaderHome />
      </Layout>
      <Layout>
        <Sider
          width={200}
          style={{ minHeight: '100vh', background: '#d6d6d6' }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={selectedKeys}
            onSelect={({ key }) => {
              if (key === '4') {
                auth?.logout()
                navigate('/')
              } else {
                setSelectedKeys([key])
              }
            }}
            style={{ height: '100%', borderRight: 0, background: '#d6d6d6' }}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Visão Geral'
              },
              {
                key: '2',
                icon: <CreditCardOutlined />,
                label: 'Contas a pagar'
              },
              {
                key: '3',
                icon: <WalletOutlined />,
                label: 'Contas a receber'
              },
              {
                key: '4',
                icon: <LogoutOutlined />,
                label: 'Sair'
              }
            ]}
          />
        </Sider>
        <Layout>{renderContent()}</Layout>
      </Layout>
    </>
  )
}

export default Home
