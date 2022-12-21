import { Button } from '../UI/IgmtInk'
import CartContext from '../../store/Cart/cart-context'
import { useContext, useEffect, useState } from 'react'

const NavBar = props => {
  const cartCtx = useContext(CartContext)
  const [cartShakeAnimate, setCartShakeAnimate] = useState(false)

  const { items: cartItems } = cartCtx

  useEffect(() => {
    console.log('ANIMATE')

    setCartShakeAnimate(true)

    const timeout = setTimeout(() => {
      setCartShakeAnimate(false)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [cartItems])

  return (
    <header className="px-8 py-4 fixed left-0 right-0 backdrop-blur-md z-20">
      <div className="max-w-3xl mx-auto flex justify-between">
        <span className="font-bold">Cheeses Fries</span>
        <nav className="flex gap-4">
          <Button attr={{ onClick: props.onAddProductShow }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 hover:fill-white/75 transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button className="relative" attr={{ onClick: props.onCartShow }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-6 h-6 hover:fill-white/75 transition-colors ${
                cartShakeAnimate ? 'animate-shake' : ''
              }`}
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            <span
              className={`absolute -top-1.5 bg-yellow-500 rounded-[50%] py-0.5 px-2 text-xs ${
                cartShakeAnimate ? 'animate-shake' : ''
              }`}
            >
              {cartItems.length}
            </span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
