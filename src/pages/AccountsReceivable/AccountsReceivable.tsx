import { App, Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import '../AccountsPayable/AccountsPayable.less'
import { AccountsReceivableRepositoryImp } from '../../repositories/AccountsReceivableRepository'

export interface IAccountsReceivable {
  description: string
  category: string
  receiptDate: string
  formOfReceipt: string
  status: string
  observations: string
  value: number
  id?: number
}

function AccountsReceivable() {
  const { message } = App.useApp()
  const handleSubmit = async (values: IAccountsReceivable) => {
    try {
      await AccountsReceivableRepositoryImp.createAccountReceivable(values)

      message.success('Conta a receber adicionada com sucesso')
    } catch (error) {
      // @ts-expect-error: error type may not have 'error.message' property
      message.error(error.error.message || 'Erro ao adicionar conta a receber')
    }
  }

  return (
    <div className="accounts-payable">
      <Typography.Title level={2} className="accounts-payable__title">
        Adicionar Contas a Receber
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

          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
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
              label="Data prevista de pagamento"
              name="receiptDate"
              rules={[
                {
                  required: true,
                  message: 'Data prevista de pagamento é obrigatória'
                }
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={9} xl={9}>
            <Form.Item
              label="Forma de Recebimento"
              name="formOfReceipt"
              rules={[
                {
                  required: true,
                  message: 'Forma de recebimento é obrigatória'
                }
              ]}
              key={'formOfReceipt'}
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
export default AccountsReceivable
