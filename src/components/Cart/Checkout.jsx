import { Button, Input } from '../UI/IgmtInk'
import { useInput } from '../../hooks/hooks-igmtink'
import CartContext from '../../store/Cart/cart-context'
import { useContext, useEffect, useState } from 'react'

const Checkout = props => {
  const cartCtx = useContext(CartContext)

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset
  } = useInput('', value => value.trim() !== '')

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset
  } = useInput('', value => value.trim() !== '')

  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: postalReset
  } = useInput('', value => value.trim() !== '')

  const {
    value: countryValue,
    isValid: countryIsValid,
    hasError: countryHasError,
    valueChangeHandler: countryChangeHandler,
    inputBlurHandler: countryBlurHandler,
    reset: countryReset
  } = useInput('', value => value.trim() !== '')

  const submitHandler = e => {
    e.preventDefault()

    if (!nameIsValid || !addressIsValid || !countryIsValid || !postalIsValid) {
      nameBlurHandler()
      addressBlurHandler()
      countryBlurHandler()
      postalBlurHandler()
      return
    }

    props.onCheckout({
      name: nameValue,
      address: addressValue,
      country: countryValue,
      postalCode: postalValue
    })

    nameReset()
    addressReset()
    countryReset()
    postalReset()

    cartCtx.clearCart()

    // if (!props.onLoading) {
    //   props.onCloseCart()
    // }
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 gap-4">
        <Button attr={{ onClick: props.onBack }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 transition-colors hover:stroke-white/75"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Button>
        <div>
          <h2 className="text-yellow-500 text-2xl font-bold">
            Payment details
          </h2>
          <h3 className="text-white/75">
            Enter your payment details below to purchase.
          </h3>
        </div>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <Input
          className={`bg-neutral-900 rounded-md p-2 ${
            nameHasError &&
            'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
          }`}
          attr={{
            placeholder: 'Name',
            value: nameValue,
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler
          }}
        />
        <Input
          className={`bg-neutral-900 rounded-md p-2 ${
            addressHasError &&
            'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
          }`}
          attr={{
            placeholder: 'Billing Address',
            value: addressValue,
            onChange: addressChangeHandler,
            onBlur: addressBlurHandler
          }}
        />
        <div className="flex justify-between gap-4">
          <Input
            className={`bg-neutral-900 rounded-md p-2 ${
              countryHasError &&
              'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
            }`}
            attr={{
              placeholder: 'Country',
              value: countryValue,
              onChange: countryChangeHandler,
              onBlur: countryBlurHandler
            }}
          />
          <Input
            className={`bg-neutral-900 rounded-md p-2 ${
              postalHasError &&
              'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
            }`}
            attr={{
              type: 'number',
              placeholder: 'Postal Code',
              value: postalValue,
              onChange: postalChangeHandler,
              onBlur: postalBlurHandler
            }}
          />
        </div>
        <Button
          className="bg-yellow-500 hover:bg-yellow-500/75 text-sm py-3 px-4 rounded-md font-medium text-neutral-900"
          attr={{ type: 'submit' }}
        >
          {props.onLoading
            ? 'Sending payment...'
            : `Complete payment — ₱${cartCtx.totalAmount}`}
        </Button>
      </form>
    </div>
  )
}

export default Checkout
