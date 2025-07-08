import { App, Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import './AccountsPayable.less'
import { AccountsPayableRepositoryImp } from '../../repositories/AccountsPayableRepository'

export interface IAccountsPayable {
  id?: number
  description?: string
  category?: string
  paymentDate?: string
  paymentMethod?: string
  status?: string
  observations?: string
  value?: number
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
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              label="Descrição"
              name="description"
              rules={[{ required: true, message: 'Descrição é obrigatória' }]}
              key={'description'}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Form.Item
              label="Valor"
              name="value"
              rules={[{ required: true, message: 'Valor é obrigatório' }]}
              key={'value'}
            >
              <Input
                type="text"
                inputMode="decimal"
                prefix="R$ "
                placeholder="0,00"
                maxLength={15}
                className="accounts-payable__input-money"
                onChange={e => {
                  // Formata o valor para moeda brasileira
                  let value = e.target.value.replace(/\D/g, '')
                  value = (Number(value) / 100).toFixed(2) + ''
                  value = value.replace('.', ',')
                  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  e.target.value = value
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Form.Item
              label="Categoria"
              name="category"
              rules={[{ required: true, message: 'Categoria é obrigatória' }]}
              key={'category'}
            >
              <Select
                options={[
                  { label: 'Alimentação', value: 'Alimentação' },
                  { label: 'Transporte', value: 'Transporte' },
                  { label: 'Saúde', value: 'Saúde' },
                  { label: 'Educação', value: 'Educação' },
                  { label: 'Outros', value: 'Outros' }
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
                  { label: 'Cartão de Crédito', value: 'Cartão de Crédito' },
                  { label: 'Boleto', value: 'Boleto' },
                  { label: 'Transferência', value: 'Transferência' },
                  { label: 'Dinheiro', value: 'Dinheiro' },
                  { label: 'Pix', value: 'Pix' }
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
                  { label: 'Pendente', value: 'Pendente' },
                  { label: 'Pago', value: 'Pago' },
                  { label: 'Cancelado', value: 'Cancelado' }
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
