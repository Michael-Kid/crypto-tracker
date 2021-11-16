import axios from 'axios'
import { API } from '../App'
import { FETCH_DATA, FILTER_COINS, LOADING } from './types'

export const fetchData = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  const res = await axios.get(API)
  dispatch({ type: FETCH_DATA, payload: res.data })
  dispatch({ type: LOADING, payload: false })
}

export const filterCoins = (query, coins) => (dispatch) => {
  dispatch({ type: LOADING, payload: true })
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  )
  dispatch({ type: FILTER_COINS, payload: filteredCoins })
  dispatch({ type: LOADING, payload: false })
}
