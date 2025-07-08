import React from 'react'

interface CurrencyBRLProps {
  value: number
}

const FormatMoney: React.FC<CurrencyBRLProps> = ({ value }) => {
  return (
    <>
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)}
    </>
  )
}

export default FormatMoney
