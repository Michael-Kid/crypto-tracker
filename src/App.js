import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Currency from './Currency'

const API =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

function App() {
  const [coins, setCoins] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data)
        console.log(res.data)
      })
      .catch((err) => alert(err))
  }, [])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className='currency-app'>
      <div className='currency-search'>
        <h1 className='currency-text'>Crypto Tracking</h1>
        <form>
          <input
            type='text'
            placeholder='Search for currency'
            className='currency-input'
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Currency
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  )
}

export default App
