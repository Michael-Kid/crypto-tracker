import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Currency from './Currency'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

const API =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

function App() {
  const [coins, setCoins] = useState([])
  const [query, setQuery] = useState('')

  const fetchData = async () => {
    try {
      const res = await axios.get(API)
      setCoins(res.data)
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  )

  const DataSet = [
    {
      columns: [
        {
          title: 'Coin Name',
          style: { font: { sz: '18', bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: 'Coin Symbol',
          style: { font: { sz: '18', bold: true } },
          width: { wch: 30 },
        }, // width in characters
        {
          title: 'Coin Price',
          style: { font: { sz: '18', bold: true } },
          width: { wpx: 100 },
        }, // width in pixels
        {
          title: 'Total Volume',
          style: { font: { sz: '18', bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: 'Price Change 24h',
          style: { font: { sz: '18', bold: true } },
          width: { wpx: 100 },
        }, // width in pixels
        {
          title: 'Market Cap',
          style: { font: { sz: '18', bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
      ],
      data: filteredCoins.map((coin) => [
        { value: coin.name, style: { font: { sz: '14' } } },
        { value: coin.symbol, style: { font: { sz: '14' } } },
        {
          value: coin.current_price,
          style: {
            font: { color: { rgb: 'ffffff' } },
            fill: { patternType: 'solid', fgColor: { rgb: '3461eb' } },
          },
        },
        {
          value: coin.total_volume,
          style: {
            font: { color: { rgb: 'ffffff' } },
            fill: { patternType: 'solid', fgColor: { rgb: 'eb1207' } },
          },
        },
        {
          value: coin.price_change_percentage_24h,
          style: {
            font: { color: { rgb: 'ffffff' } },
            fill: { patternType: 'solid', fgColor: { rgb: '4bd909' } },
          },
        },
        {
          value: coin.market_cap,
          style: {
            font: { color: { rgb: 'ffffff' } },
            fill: { patternType: 'solid', fgColor: { rgb: 'ebc907' } },
          },
        },
      ]),
    },
  ]

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
        <div className='btn-container'>
          <button className='btn' onClick={fetchData}>
            Update the data
          </button>
          {filteredCoins.length > 0 && (
            <ExcelFile
              filename='Crypto Data'
              element={
                <button type='button' className='btn'>
                  Export Data
                </button>
              }
            >
              <ExcelSheet dataSet={DataSet} name='Crypto Data'></ExcelSheet>
            </ExcelFile>
          )}
        </div>
      </div>
      {filteredCoins.length === 0 && <h1>No coins found</h1>}
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
