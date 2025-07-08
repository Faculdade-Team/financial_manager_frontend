import { App, Button, Col, Input, Modal, Row } from 'antd'
import './GeneralVision.less'
import { useAuth } from '../../Providers/AuthProvider'
import FormatMoney from '../../components/FormatMoney'
import { useState } from 'react'
import {
  AuthUserRepositoryImp,
  IDepositOrWithDraw
} from '../../repositories/UserRepository'

type ModalType = 'deposito' | 'saque'

function GeneralVision() {
  const auth = useAuth()
  const { message } = App.useApp()
  const [deposito, setDeposito] = useState('')
  const [saque, setSaque] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ModalType>('deposito')

  const handleOpenModal = (type: ModalType) => {
    setTypeModal(type)
    setOpenModal(true)
  }

  const handleDepositOrWithDraw = async (value: string) => {
    try {
      const formatValue = value.replace(',', '.')
      const numericValue = parseFloat(formatValue)
      const data: IDepositOrWithDraw = {
        value: numericValue,
        userId: auth?.user?.id ?? 0,
        type: typeModal
      }

      let response
      if (typeModal === 'deposito') {
        response = await AuthUserRepositoryImp.deposit(data)
      } else {
        response = await AuthUserRepositoryImp.withdraw(data)
      }

      if (response) {
        message.success(
          typeModal === 'deposito'
            ? 'Depósito realizado com sucesso'
            : 'Saque realizado com sucesso'
        )
        setDeposito('')
        setSaque('')
        await auth?.loadUser()
        setOpenModal(false)
      }
    } catch (error) {
      message.error(
        // @ts-expect-error error object may not have 'error' property
        error.error.message || 'Erro ao depositar'
      )
    }
  }

  return (
    <>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <h2>{typeModal === 'deposito' ? 'Depositar' : 'Sacar'}</h2>
        <div className="modal-content">
          <Input
            value={typeModal === 'deposito' ? deposito : saque}
            onChange={e => {
              let value = e.target.value.replace(/[^0-9.,]/g, '')
              value = value.replace('.', ',')
              if (typeModal === 'deposito') {
                setDeposito(value)
              } else {
                setSaque(value)
              }
            }}
            placeholder={`Valor para ${typeModal}`}
            prefix="R$"
          />
          <Button
            type="primary"
            onClick={
              typeModal === 'deposito'
                ? () => handleDepositOrWithDraw(deposito)
                : () => handleDepositOrWithDraw(saque)
            }
          >
            {typeModal === 'deposito' ? 'Depositar' : 'Sacar'}
          </Button>
        </div>
      </Modal>
      <Row gutter={[16, 16]} className="container-cards">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="container-cards__budget">
            <h3 className="container-cards__budget--title">Crédito</h3>
            <p className="container-cards__budget--value">
              <FormatMoney value={auth?.user?.balance ?? 0} />
            </p>
            <div className="container-cards__budget--buttons">
              <Button onClick={() => handleOpenModal('deposito')}>
                Depositar
              </Button>
              <Button onClick={() => handleOpenModal('saque')}>Sacar</Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="container-cards__budget">
            <h3 className="container-cards__budget--title">Contas a pagar</h3>
          </div>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="container-cards__budget">
            <h3 className="container-cards__budget--title">Contas a Receber</h3>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default GeneralVision
