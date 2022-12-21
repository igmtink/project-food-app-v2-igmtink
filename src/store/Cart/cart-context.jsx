import React from 'react'

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  onAdd: item => {},
  onRemove: id => {}
})

export default CartContext
