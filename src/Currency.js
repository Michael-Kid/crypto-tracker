import React from 'react'
import './Currency.css'

const Currency = ({
  image,
  name,
  price,
  symbol,
  volume,
  priceChange,
  marketcap,
}) => {
  return (
    <div className='currency-container'>
      <div className='currency-row'>
        <div className='currency'>
          <img src={image} alt={name} />
          <h1>{name}</h1>
          <p className='currency-symbol'>{symbol}</p>
        </div>
        <div className='currency-data'>
          <p className='currency-price'>${price}</p>
          <p className='currency-volume'>${volume.toLocaleString('en')}</p>
          {priceChange < 0 ? (
            <p className='currency-percent red'>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className='currency-percent green'>{priceChange.toFixed(2)}%</p>
          )}
          <p className='currency-marketcap'>
            Market Cap: ${marketcap.toLocaleString('en')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Currency
