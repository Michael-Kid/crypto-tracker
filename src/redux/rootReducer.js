import { FETCH_DATA, FILTER_COINS, LOADING } from './types'

const initialState = {
  coins: [],
  filteredCoins: [],
  loading: false,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, coins: action.payload, filteredCoins: action.payload }
    case FILTER_COINS:
      return { ...state, filteredCoins: action.payload }
    case LOADING:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
