import { Button, Input, Form, Col, App } from 'antd'
import './BodyRegister.less'
import { UnauthUserRepositoryImp } from '../../../repositories/UserRepository'
import { useState } from 'react'

export interface BodyRegisterProps {
  name: string
  email: string
  password: string
}

function BodyRegister() {
  const { message } = App.useApp()
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values: BodyRegisterProps) => {
    try {
      setLoading(true)
      const response = await UnauthUserRepositoryImp.createUser(values)
      console.log(response)
      message.success('Usuário criado com sucesso')
    } catch (error) {
      // @ts-expect-error error object may not have 'error' property
      message.error(error.error.message || 'Erro ao criar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form layout="vertical" className="form-register" onFinish={onSubmit}>
        <Col
          xs={24}
          sm={16}
          md={12}
          lg={10}
          xl={8}
          className="form-register__col"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Senha" name="password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>

          <Form.Item
            label="Confirmar Senha"
            name="confirmPassword"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form-register__col__button"
              style={{ margin: '0 auto', width: '100%' }}
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </>
  )
}
export default BodyRegister
