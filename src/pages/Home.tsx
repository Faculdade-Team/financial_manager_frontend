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
        <Layout>
          <GeneralVision />
        </Layout>
      </Layout>
    </>
  )
}

export default Home
