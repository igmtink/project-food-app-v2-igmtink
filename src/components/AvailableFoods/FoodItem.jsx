import { useInput } from '../../hooks/hooks-igmtink'
import { Button, Input } from '../UI/IgmtInk'
import CartContext from '../../store/Cart/cart-context'
import { useContext, useCallback } from 'react'

const FoodItem = props => {
  const {
    value,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  } = useInput(0, value => value > 0)

  const price = props.price.toFixed(2)

  const cartCtx = useContext(CartContext)

  const addToCartHandler = useCallback(() => {
    if (!isValid) {
      inputBlurHandler()
      return
    }

    cartCtx.onAdd({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      quantity: value
    })

    reset()
  }, [isValid])

  return (
    <li className="grid grid-cols-1 gap-6 border-b-neutral-700 border-b-2 last:border-b-0 py-4 first:pt-0 animate-shake">
      <div className="grid grid-cols-1 gap-2">
        <h2 className="font-bold text-lg">{props.name}</h2>
        <h3 className="line-clamp-3 text-white/70">{props.description}</h3>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-yellow-500 font-medium">P{price}</span>
        <div className="flex items-center gap-2">
          <Input
            className={`bg-neutral-900 text-center px-2 py-1 rounded-xl w-16 ${
              hasError &&
              'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
            }`}
            attr={{
              type: 'number',
              min: 0,
              onChange: valueChangeHandler,
              onBlur: inputBlurHandler,
              value: value
            }}
          />
          <Button
            className="rounded-full bg-neutral-900 p-2"
            attr={{ onClick: addToCartHandler }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 hover:fill-white/75 transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default FoodItem
