import { Button } from 'antd'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div>
      <h1>Sobre</h1>
      <Link to="/">
        <Button>Voltar</Button>
      </Link>
    </div>
  )
}

export default About
