import { Button, Modal } from '../UI/IgmtInk'
import CartContext from '../../store/Cart/cart-context'
import { useContext, useState, useCallback } from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'
import { useHttp } from '../../hooks/hooks-igmtink'

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

  const { isLoading, error, sendRequest: submitOrder } = useHttp()

  const submitOrderHandler = useCallback(
    userData => {
      submitOrder({
        url: process.env.REACT_APP_FOODS_ORDERS_DB,
        method: 'POST',
        body: {
          user: userData,
          orderedItems: { Products: cartCtx.items, totalAmount: totalAmount }
        },
        headers: { 'Content-Type': 'application/json' }
      })
    },
    [cartCtx.items]
  )

  let content = (
    <div className="h-full flex items-center justify-center">
      No Cart Found.
    </div>
  )

  if (cartList.length > 0) {
    content = <ul className="h-full overflow-auto">{cartList}</ul>
  }

  let section

  if (isCheckout) {
    section = (
      <section className="h-full">
        <Checkout
          onLoading={isLoading}
          onCheckout={submitOrderHandler}
          onBack={orderCancelHandler}
          onCloseCart={props.onCartHide}
        />
      </section>
    )
  } else {
    section = (
      <section className="flex flex-col gap-6 h-full">
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
    <Modal className="bg-neutral-800 p-4 absolute top-0 bottom-0 right-0 w-80 animate-slide-right-to-left">
      {section}
    </Modal>
  )
}

export default CartList
