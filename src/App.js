import NavBar from './components/Layout/NavBar'
import Homepage from './components/Page/Homepage'
import { useState, useCallback } from 'react'
import CartProvider from './store/Cart/CartProvider'
import { useModal } from './hooks/hooks-igmtink'

function App() {
  const {
    modalIsShow: isAddProductShow,
    showModalHandler: openAddProductHandler,
    hideModalHandler: closeAddProductHandler
  } = useModal()

  const {
    modalIsShow: cartIsShow,
    showModalHandler: cartShowHandler,
    hideModalHandler: cartHideHandler
  } = useModal()

  return (
    <main className="max-w-2xl mx-auto h-screen">
      <CartProvider>
        <NavBar
          onAddProductShow={openAddProductHandler}
          onCartShow={cartShowHandler}
        />
        <Homepage
          isAddProductShow={isAddProductShow}
          onAddProductShow={closeAddProductHandler}
          cartIsShow={cartIsShow}
          onCartHide={cartHideHandler}
        />
      </CartProvider>
    </main>
  )
}

export default App
