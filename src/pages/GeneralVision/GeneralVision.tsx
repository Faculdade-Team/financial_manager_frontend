import { App, Button, Col, Input, Modal, Row } from 'antd'
import './GeneralVision.less'
import { useAuth } from '../../Providers/AuthProvider'
import FormatMoney from '../../components/FormatMoney'
import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
  AuthUserRepositoryImp,
  IDepositOrWithDraw
} from '../../repositories/UserRepository'
import { AccountsPayableRepositoryImp } from '../../repositories/AccountsPayableRepository'
import { AccountsReceivableRepositoryImp } from '../../repositories/AccountsReceivableRepository'
import { IAccountsReceivable } from '../AccountsReceivable/AccountsReceivable'
import { IAccountsPayable } from '../AccountsPayable/AccountsPayable'
import { useNavigate } from 'react-router-dom'

interface IAccountsPayableSelect {
  setSelectedKeys: (keys: string[]) => void
}

type ModalType = 'deposito' | 'saque'

function GeneralVision({ setSelectedKeys }: IAccountsPayableSelect) {
  const auth = useAuth()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [deposito, setDeposito] = useState('')
  const [saque, setSaque] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ModalType>('deposito')
  const [accountsPayable, setAccountsPayable] = useState<
    Array<IAccountsPayable>
  >([])
  const [accountsReceivable, setAccountsReceivable] = useState<
    Array<IAccountsReceivable>
  >([])

  const handleOpenModal = (type: ModalType) => {
    setTypeModal(type)
    setOpenModal(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsPayableData =
          await AccountsPayableRepositoryImp.getAccountsPayable()
        const accountsReceivableData =
          await AccountsReceivableRepositoryImp.getAccountsReceivable()

        if (accountsPayableData?.data)
          setAccountsPayable(
            (accountsPayableData.data.data as unknown as IAccountsPayable[]) ||
              []
          )
        if (accountsReceivableData?.data)
          setAccountsReceivable(
            (accountsReceivableData.data
              .data as unknown as IAccountsReceivable[]) || []
          )
      } catch (error) {
        // @ts-expect-error error object may not have 'error' property
        message.error(error.error.message)
      }
    }

    fetchData()
  }, [setSelectedKeys, message])

  const handlePayable = async (value: number, paymentId: number) => {
    try {
      await AuthUserRepositoryImp.payAccount({ value, paymentId })
      message.success('Conta paga com sucesso')
      navigate(0)
    } catch (error) {
      // @ts-expect-error error object may not have 'error' property
      message.error(error.error.message)
    }
  }

  const handleReceivable = async (value: number, receivableId: number) => {
    try {
      await AuthUserRepositoryImp.receiveAccount({ value, receivableId })
      message.success('Conta recebida com sucesso')
      navigate(0)
    } catch (error) {
      // @ts-expect-error error object may not have 'error' property
      message.error(error.error.message)
    }
  }

  const handleDeleteCard = async (
    cardId: number,
    typeCard: 'payable' | 'receivable'
  ) => {
    try {
      if (typeCard === 'payable') {
        await AccountsPayableRepositoryImp.deleteAccountPayable(cardId)
      } else {
        await AccountsReceivableRepositoryImp.deleteAccountReceivable(cardId)
      }
      message.success('Conta excluída com sucesso')
      navigate(0)
    } catch (error) {
      // @ts-expect-error error object may not have 'error' property
      message.error(error.error.message)
    }
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
            <div className="container-cards__budget--content">
              {accountsPayable.length === 0 ? (
                <p>Nenhuma conta a pagar</p>
              ) : (
                accountsPayable.map((item: IAccountsPayable, idx: number) => (
                  <Row
                    key={item.id ?? idx}
                    className="container-cards__budget--content__item"
                  >
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                      <p>
                        {item.description ?? 'Sem descrição'} -{' '}
                        <FormatMoney value={item.value ?? 0} />
                      </p>
                      <p>Status: {item.status}</p>
                      <p>Categoria: {item.category ?? 'Sem categoria'}</p>
                      <p>
                        Método de pagamento:{' '}
                        {item.paymentMethod ?? 'Sem método de pagamento'}
                      </p>
                      <p>
                        Observações: {item.observations ?? 'Sem observações'}
                      </p>
                      <p>
                        Data de vencimento:{' '}
                        {item.paymentDate
                          ? new Date(item.paymentDate).toLocaleDateString(
                              'pt-BR'
                            )
                          : 'Sem data de vencimento'}
                      </p>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={4}
                      lg={4}
                      xl={4}
                      className="container-cards__budget--content__item--icons"
                    >
                      <div>
                        <DeleteOutlined
                          onClick={() =>
                            handleDeleteCard(item.id as number, 'payable')
                          }
                          style={{
                            fontSize: 22,
                            color: 'red',
                            cursor: 'pointer'
                          }}
                        />
                      </div>

                      <Button
                        style={{ width: '100%' }}
                        onClick={() =>
                          handlePayable(item.value as number, item.id as number)
                        }
                      >
                        Pagar
                      </Button>
                    </Col>
                  </Row>
                ))
              )}
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="container-cards__budget">
            <h3 className="container-cards__budget--title">Contas a Receber</h3>
            <div className="container-cards__budget--content">
              {accountsPayable.length === 0 ? (
                <p>Nenhuma conta a pagar</p>
              ) : (
                accountsReceivable.map(
                  (item: IAccountsReceivable, idx: number) => (
                    <Row
                      key={item.id ?? idx}
                      className="container-cards__budget--content__item"
                    >
                      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <p>
                          {item.description ?? 'Sem descrição'} -{' '}
                          <FormatMoney value={item.value ?? 0} />
                        </p>
                        <p>Status: {item.status}</p>
                        <p>Categoria: {item.category ?? 'Sem categoria'}</p>
                        <p>
                          Forma de Recebimento:{' '}
                          {item.formOfReceipt ?? 'Sem forma de recebimento'}
                        </p>
                        <p>
                          Observações: {item.observations ?? 'Sem observações'}
                        </p>
                        <p>
                          Data prevista de pagamento:{' '}
                          {item.receiptDate
                            ? new Date(item.receiptDate).toLocaleDateString(
                                'pt-BR'
                              )
                            : 'Sem data prevista de pagamento'}
                        </p>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={4}
                        lg={4}
                        xl={4}
                        className="container-cards__budget--content__item--icons"
                      >
                        <div>
                          <DeleteOutlined
                            onClick={() =>
                              handleDeleteCard(item.id as number, 'receivable')
                            }
                            style={{
                              fontSize: 22,
                              color: 'red',
                              cursor: 'pointer'
                            }}
                          />
                        </div>
                        <Button
                          style={{ width: '100%' }}
                          onClick={() =>
                            handleReceivable(
                              item.value as number,
                              item.id as number
                            )
                          }
                        >
                          Receber
                        </Button>
                      </Col>
                    </Row>
                  )
                )
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default GeneralVision
