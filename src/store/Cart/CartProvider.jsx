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

    const findCartExistedByIndex = state.items.findIndex(
      item => item.id === action.item.id
    )

    const cartExisted = state.items[findCartExistedByIndex]

    let updatedCarts

    if (cartExisted) {
      const updatedCart = {
        ...cartExisted,
        quantity: cartExisted.quantity + action.item.quantity
      }

      console.log(updatedCart)

      updatedCarts = [...state.items]
      updatedCarts[findCartExistedByIndex] = updatedCart
    } else {
      updatedCarts = state.items.concat(action.item)
    }

    return {
      items: updatedCarts,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'REMOVE') {
    const findCartExistedByIndex = state.items.findIndex(
      item => item.id === action.id
    )

    const cartExisted = state.items[findCartExistedByIndex]

    const updatedTotalAmount = state.totalAmount - cartExisted.price

    let updatedCarts

    if (cartExisted.quantity === 1) {
      updatedCarts = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedCart = {
        ...cartExisted,
        quantity: cartExisted.quantity - 1
      }

      updatedCarts = [...state.items]
      updatedCarts[findCartExistedByIndex] = updatedCart
    }

    return { items: updatedCarts, totalAmount: updatedTotalAmount }
  }

  if (action.type === 'CLEAR') {
    return initialCartState
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

  const removeToCartHandler = id => {
    dispatchCart({ type: 'REMOVE', id: id })
  }

  const clearCartHandler = () => {
    dispatchCart({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    onAdd: addToCartHandler,
    onRemove: removeToCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
