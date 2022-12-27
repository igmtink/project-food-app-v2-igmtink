import React from 'react'

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  onAdd: item => {},
  onRemove: id => {},
  clearCart: () => {}
})

export default CartContext
