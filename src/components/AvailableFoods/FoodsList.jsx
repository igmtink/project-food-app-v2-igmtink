import { useHttp } from '../../hooks/hooks-igmtink'
import { useState, useEffect } from 'react'
import FoodItem from './FoodItem'
import FoodForm from './FoodForm'

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
        url: process.env.REACT_APP_FOODS_DB
      },
      foodsDataConfig
    )
  }, [fetchData])

  const savedProductHandler = product => {
    setFoods(prevFoods => prevFoods.concat(product))
  }

  const foodsList = foods.map(food => (
    <FoodItem
      key={food.id}
      id={food.id}
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

  return (
    <>
      {props.isAddProductShow && (
        <FoodForm
          onAddProductShow={props.onAddProductShow}
          onHideAddProduct={props.onHideAddProduct}
          onAddProduct={savedProductHandler}
        />
      )}

      <div className="h-full">{content}</div>
    </>
  )
}

export default FoodsList
