import { useHttp } from '../../hooks/hooks-igmtink'
import { useState, useEffect } from 'react'
import FoodItem from './FoodItem'

const FoodsList = props => {
  const { isLoading, error, sendRequest: fetchData } = useHttp()
  const [foods, setFoods] = useState([])

  useEffect(() => {
    const foodsDataConfig = items => {
      const foodsLoaded = []

      for (const key in items) {
        foodsLoaded.push({
          id: key,
          name: items[key].name,
          description: items[key].description,
          price: items[key].price
        })
      }
      setFoods(foodsLoaded)
    }

    fetchData(
      {
        url: 'https://project-food-app-v2-igmtink-default-rtdb.firebaseio.com/foods.json'
      },
      foodsDataConfig
    )
  }, [fetchData])

  const foodsList = foods.map(food => (
    <FoodItem
      key={food.id}
      name={food.name}
      description={food.description}
      price={food.price}
    />
  ))

  let content = (
    <div className="h-full flex items-center justify-center">
      No Foods Available.
    </div>
  )

  if (isLoading) {
    content = (
      <div className="h-full flex items-center justify-center">Loading...</div>
    )
  }

  if (foods.length > 0) {
    content = <ul>{foodsList}</ul>
  }

  if (error) {
    content = (
      <div className="h-full flex items-center justify-center">{error}</div>
    )
  }

  return <div className="h-full">{content}</div>
}

export default FoodsList
