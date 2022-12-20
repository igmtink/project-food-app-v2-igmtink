import FoodsList from '../AvailableFoods/FoodsList'
import { Section, Card } from '../UI/IgmtInk'

const Homepage = props => {
  return (
    <Section className="pt-14 pb-8 h-screen flex flex-col">
      <div className="h-[30vh] flex items-center animate-slide-down">
        <h1 className="text-4xl">
          Fast and <br />
          <span className="text-yellow-500 font-bold">Delicious</span> Food
        </h1>
      </div>

      <Card className="h-full overflow-auto animate-slide-up">
        <FoodsList
          isAddProductShow={props.isAddProductShow}
          onAddProductShow={props.onAddProductShow}
        />
      </Card>
    </Section>
  )
}

export default Homepage
