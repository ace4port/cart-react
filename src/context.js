import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  const remove = (id) => {
    dispatch({type: 'REMOVE', payload: id})
  }
  const inrdcr = (id, type) => {
    dispatch({type:'INRDCR', payload: {id, type}})
  }
  useEffect(() => {
    dispatch({type: 'GET_TOTAL'})
  }, [state.cart])

  const fetchData = async () => {
    dispatch({type: 'LOADING'})
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: 'DISPLAY', payload: cart})
  }
  useEffect(() => {
    fetchData();
  },[])
  return (
    <AppContext.Provider
      value={{
        ...state, 
        clearCart,
        remove,
        inrdcr,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
