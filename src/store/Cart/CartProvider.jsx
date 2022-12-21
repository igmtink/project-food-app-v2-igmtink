import CartContext from './cart-context'
import { useReducer } from 'react'

const initialCartState = {
  items: [],
  totalAmount: 0
}

const cartStateReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.quantity * action.item.price

    return {
      items: state.items.concat(action.item),
      totalAmount: updatedTotalAmount
    }
  }

  return initialCartState
}

const CartProvider = props => {
  const [cartState, dispatchCart] = useReducer(
    cartStateReducer,
    initialCartState
  )

  const addToCartHandler = item => {
    dispatchCart({ type: 'ADD', item: item })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    onAdd: addToCartHandler,
    onRemove: id => {}
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
