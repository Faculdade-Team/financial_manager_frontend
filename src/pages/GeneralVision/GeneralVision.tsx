import { Button, Col, Row } from 'antd'
import './GeneralVision.less'

function GeneralVision() {
  return (
    <Row gutter={[16, 16]} className="container-cards">
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="container-cards__budget">
          <h3 className="container-cards__budget--title">Crédito</h3>
          <p className="container-cards__budget--value">R$ 5.000,00</p>
          <div className="container-cards__budget--buttons">
            <Button>Depositar</Button>
            <Button>Sacar</Button>
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
          <h3 className="container-cards__budget--title">Contas a pagar</h3>
        </div>
      </Col>
    </Row>
  )
}

export default GeneralVision
