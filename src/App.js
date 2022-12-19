import FoodForm from './components/AvailableFoods/FoodForm'
import NavBar from './components/Layout/NavBar'
import Homepage from './components/Page/Homepage'

import { useState, useCallback } from 'react'

function App() {
  const [isFoodForm, setIsFoodForm] = useState(false)

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      setIsFoodForm(false)
    }
  })

  const foodFormHandler = useCallback(() => {
    setIsFoodForm(true)
  }, [])

  return (
    <main className="max-w-2xl mx-auto h-screen">
      <NavBar onFoodForm={foodFormHandler} />
      <Homepage />
      {isFoodForm && <FoodForm />}
    </main>
  )
}

export default App
