import { App, Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import './AccountsPayable.less'
import { AccountsPayableRepositoryImp } from '../../repositories/AccountsPayableRepository'

export interface IAccountsPayable {
  description: string
  category: string
  paymentDate: string
  paymentMethod: string
  status: string
  observations: string
}

function AccountsPayable() {
  const { message } = App.useApp()

  const handleSubmit = async (values: IAccountsPayable) => {
    try {
      await AccountsPayableRepositoryImp.createAccountPayable(values)

      message.success('Conta a pagar adicionada com sucesso')
    } catch (error) {
      // @ts-expect-error: error type may not have 'error.message' property
      message.error(error.error.message || 'Erro ao adicionar conta a pagar')
    }
  }

  return (
    <div className="accounts-payable">
      <Typography.Title level={2} className="accounts-payable__title">
        Adicionar Contas a Pagar
      </Typography.Title>
      <Form
        layout="vertical"
        className="accounts-payable__form"
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={12} xl={12}>
            <Form.Item
              label="Descrição"
              name="description"
              rules={[{ required: true, message: 'Descrição é obrigatória' }]}
              key={'description'}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={12} xl={12}>
            <Form.Item
              label="Categoria"
              name="category"
              rules={[{ required: true, message: 'Categoria é obrigatória' }]}
              key={'category'}
            >
              <Select
                options={[
                  { label: 'Alimentação', value: 'food' },
                  { label: 'Transporte', value: 'transport' },
                  { label: 'Saúde', value: 'health' },
                  { label: 'Educação', value: 'education' },
                  { label: 'Outros', value: 'others' }
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={9} xl={6}>
            <Form.Item
              label="Data de vencimento"
              name="paymentDate"
              rules={[
                { required: true, message: 'Data de vencimento é obrigatória' }
              ]}
              key={'paymentDate'}
            >
              <Input type="date" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={9} xl={9}>
            <Form.Item
              label="Forma de pagamento"
              name="paymentMethod"
              rules={[
                { required: true, message: 'Forma de pagamento é obrigatória' }
              ]}
              key={'paymentMethod'}
            >
              <Select
                options={[
                  { label: 'Cartão de Crédito', value: 'credit_card' },
                  { label: 'Boleto', value: 'boleto' },
                  { label: 'Transferência', value: 'transfer' },
                  { label: 'Dinheiro', value: 'cash' },
                  { label: 'Pix', value: 'pix' }
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={9} xl={9}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Status é obrigatório' }]}
              key={'status'}
            >
              <Select
                options={[
                  { label: 'Pendente', value: 'pending' },
                  { label: 'Pago', value: 'paid' },
                  { label: 'Cancelado', value: 'canceled' }
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xl={18}>
            <Form.Item
              label="Observações"
              name="observations"
              rules={[
                { required: true, message: 'Observações são obrigatórias' }
              ]}
              key={'observations'}
            >
              <TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          className="accounts-payable__form-button"
        >
          Adicionar
        </Button>
      </Form>
    </div>
  )
}
export default AccountsPayable
