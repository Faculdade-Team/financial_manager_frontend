import { Button, Form, Input } from 'antd'
import './BodySignIn.less'

function BodySignIn() {
  return (
    <div className="form-sign-in">
      <h3 className="form-sign-in__title">Login</h3>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={values => {
          console.log('Received values:', values)
        }}
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
          <Button htmlType="submit">Acessar</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BodySignIn
