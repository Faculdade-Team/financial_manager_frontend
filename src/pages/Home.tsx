import { Button } from 'antd'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <Link to="/about">
        <Button type="primary">Ir para Sobre</Button>
      </Link>
    </div>
  )
}

export default Home
