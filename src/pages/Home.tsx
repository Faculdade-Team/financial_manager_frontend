import { Button } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Home() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/auth/teste/ping')

        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }
  , [])

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
