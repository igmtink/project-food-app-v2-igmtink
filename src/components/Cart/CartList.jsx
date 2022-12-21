import { Modal } from '../UI/IgmtInk'
import CartContext from '../../store/Cart/cart-context'
import { useContext } from 'react'
import CartItem from './CartItem'

const CartList = props => {
  const cartCtx = useContext(CartContext)

  const cartList = cartCtx.items.map(cart => (
    <CartItem
      key={cart.id}
      name={cart.name}
      description={cart.description}
      price={cart.price}
      quantity={cart.quantity}
    />
  ))

  let content = (
    <div className="h-full flex items-center justify-center">
      No Cart Found.
    </div>
  )

  if (cartList.length > 0) {
    content = <ul className="pt-6 h-full overflow-auto">{cartList}</ul>
  }

  return (
    <Modal className="bg-neutral-800 p-4 flex flex-col animate-slide-down h-[567px]">
      <h1 className="text-yellow-500 font-bold text-2xl">Foods Cart</h1>
      {content}
      <div className="text-right">Total Amount: {cartCtx.totalAmount}</div>
    </Modal>
  )
}

export default CartList
