import FoodsList from '../AvailableFoods/FoodsList'
import { Section, Card } from '../UI/IgmtInk'
import FoodForm from '../AvailableFoods/FoodForm'

const Homepage = props => {
  return (
    <Section className="pt-14 pb-8 h-screen flex flex-col">
      {props.isAddProductShow && (
        <FoodForm onAddProductShow={props.closeAddProductHandler} />
      )}
      <div className="h-[30vh] flex items-center animate-slide-down">
        <h1 className="text-4xl">
          Fast and <br />
          <span className="text-yellow-500 font-bold">Delicious</span> Food
        </h1>
      </div>

      <Card className="h-full overflow-auto animate-slide-up">
        <FoodsList />
      </Card>
    </Section>
  )
}

export default Homepage
