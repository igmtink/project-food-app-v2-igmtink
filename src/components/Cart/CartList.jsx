import { Button, Modal } from '../UI/IgmtInk'
import CartContext from '../../store/Cart/cart-context'
import { useContext } from 'react'
import CartItem from './CartItem'

const CartList = props => {
  const cartCtx = useContext(CartContext)

  const onAddHandler = item => {
    cartCtx.onAdd({ ...item, quantity: 1 })
  }

  const onRemoveHandler = id => {
    cartCtx.onRemove(id)
  }

  const cartList = cartCtx.items.map(cart => (
    <CartItem
      key={cart.id}
      name={cart.name}
      description={cart.description}
      price={cart.price}
      quantity={cart.quantity}
      onAdd={onAddHandler.bind(null, cart)}
      onRemove={onRemoveHandler.bind(null, cart.id)}
    />
  ))

  const totalAmount = cartCtx.totalAmount.toFixed(2)

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
      <div className="grid grid-cols-1 gap-2 justify-items-end">
        <span className="font-bold">Total Amount: ₱{totalAmount}</span>
        <div className="flex gap-2">
          <Button
            className="bg-red-500 hover:bg-red-500/75 py-2 px-4 rounded-md font-bold"
            attr={{ onClick: props.onCartHide }}
          >
            CLOSE
          </Button>
          {cartList.length > 0 && (
            <Button className="bg-neutral-900 hover:bg-neutral-900/75 py-2 px-4 rounded-md font-bold">
              ORDER
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default CartList
