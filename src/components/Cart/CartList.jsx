import { Button, Modal } from '../UI/IgmtInk'
import CartContext from '../../store/Cart/cart-context'
import { useContext, useState } from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'

const CartList = props => {
  const [isCheckout, setIsCheckout] = useState(false)

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const orderCancelHandler = () => {
    setIsCheckout(false)
  }

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

  let section

  if (isCheckout) {
    section = (
      <section className="h-full">
        <Checkout onBack={orderCancelHandler} onCloseCart={props.onCartHide} />
      </section>
    )
  } else {
    section = (
      <section className="flex flex-col h-full">
        <h1 className="text-yellow-500 font-bold text-2xl">Foods Cart</h1>
        {content}
        <div className="grid grid-cols-1 gap-2 justify-items-end">
          <span className="font-bold">Total Amount: ₱{totalAmount}</span>
          <div className="flex gap-2">
            <Button
              className="bg-red-500 hover:bg-red-500/75 text-sm py-2 px-4 rounded-md font-medium"
              attr={{ onClick: props.onCartHide }}
            >
              CLOSE
            </Button>
            {cartList.length > 0 && (
              <Button
                className="bg-neutral-900 hover:bg-neutral-900/75 text-sm py-2 px-4 rounded-md font-medium"
                attr={{ onClick: orderHandler }}
              >
                ORDER
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <Modal className="bg-neutral-800 p-4 animate-slide-down h-[567px]">
      {section}
    </Modal>
  )
}

export default CartList
