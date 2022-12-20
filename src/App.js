import FoodForm from './components/AvailableFoods/FoodForm'
import NavBar from './components/Layout/NavBar'
import Homepage from './components/Page/Homepage'

import { useState, useCallback } from 'react'

function App() {
  const [isAddProductShow, setIsAddProductShow] = useState(false)

  const closeAddProductHandler = useCallback(() => {
    setIsAddProductShow(false)
  }, [])

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAddProductHandler()
    }
  })

  const openAddProductHandler = useCallback(() => {
    setIsAddProductShow(true)
  }, [])

  return (
    <main className="max-w-2xl mx-auto h-screen">
      <NavBar onAddProductShow={openAddProductHandler} />
      <Homepage
        isAddProductShow={isAddProductShow}
        onAddProductShow={closeAddProductHandler}
      />
    </main>
  )
}

export default App
