import { useEffect, useState } from 'react'
import api from '../services/api'
import HeaderHome from './Header/HeaderHome/HeaderHome'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  SwapOutlined,
  CreditCardOutlined,
  WalletOutlined
} from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'
import GeneralVision from './GeneralVision/GeneralVision'
import AccountsPayable from './AccountsPayable/AccountsPayable'
import AccountsReceivable from './AccountsReceivable/AccountsReceivable'
import Transactions from './Transactions/Transactions'

function Home() {
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
        return <Transactions />
      case '3':
        return <AccountsPayable />
      case '4':
        return <AccountsReceivable />
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
            onSelect={({ key }) => setSelectedKeys([key])}
            style={{ height: '100%', borderRight: 0, background: '#d6d6d6' }}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Visão Geral'
              },
              {
                key: '2',
                icon: <SwapOutlined />,
                label: 'Transações'
              },
              {
                key: '3',
                icon: <CreditCardOutlined />,
                label: 'Contas a pagar'
              },
              {
                key: '4',
                icon: <WalletOutlined />,
                label: 'Contas a receber'
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
