import { App, Button, Col, Form, Input, Typography } from 'antd'
import './BodySignIn.less'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UnauthUserRepositoryImp } from '../../../repositories/UserRepository'
import { useState } from 'react'
import { useAuth } from '../../../Providers/AuthProvider'

export interface ISignInProps {
  email: string
  password: string
}

function BodySignIn() {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const auth = useAuth()
  if (!auth) {
    throw new Error('Auth context is not available')
  }
  const { login } = auth

  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (values: ISignInProps) => {
    try {
      setLoading(true)
      const response = await UnauthUserRepositoryImp.signIn(values)
      console.log('response', response)

      const user = (response.data as unknown as { user?: { token: string } })
        .user
      if (!user?.token) {
        throw new Error('Token não encontrado na resposta do servidor')
      }
      const token = user.token

      await login(token)
      message.success('Login realizado com sucesso')
      setLoading(false)
      navigate('/home')
    } catch (error) {
      // @ts-expect-error error object may not have 'error' property
      message.error(error.error.message || 'Erro ao fazer login')
      setLoading(false)
    }
  }
  return (
    <div className="form-sign-in">
      <h3 className="form-sign-in__title">Login</h3>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        style={{ textAlign: 'center' }}
      >
        <Col
          span={24}
          xs={24}
          sm={16}
          md={12}
          lg={8}
          xl={6}
          style={{ margin: '0 auto' }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Digite seu e-mail " />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{ width: '100%' }}
              loading={loading}
            >
              Acessar
            </Button>
          </Form.Item>
        </Col>
      </Form>
      <Link to="/register" className="form-sign-in__register">
        <Typography.Link>Não tem uma conta? Cadastre-se</Typography.Link>
      </Link>
    </div>
  )
}

export default BodySignIn
