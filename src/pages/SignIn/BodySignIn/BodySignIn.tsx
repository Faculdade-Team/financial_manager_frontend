import { Button, Col, Form, Input } from 'antd'
import './BodySignIn.less'
import { useNavigate } from 'react-router-dom'

function BodySignIn() {
  const navigate = useNavigate()
  return (
    <div className="form-sign-in">
      <h3 className="form-sign-in__title">Login</h3>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={() => {
          navigate('/home')
        }}
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
            <Button htmlType="submit" style={{ width: '100%' }}>
              Acessar
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </div>
  )
}

export default BodySignIn
