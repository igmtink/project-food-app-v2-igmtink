import FoodsList from '../AvailableFoods/FoodsList'
import { Section, Card } from '../UI/IgmtInk'

const Homepage = props => {
  return (
    <Section className="pt-14 pb-8 h-screen flex flex-col">
      <div className="h-[30vh] flex items-center">
        <h1 className="text-4xl">
          Fast and <br />
          <span className="text-yellow-500 font-bold">Delicious</span> Food
        </h1>
      </div>

      <Card className="h-full overflow-auto">
        <FoodsList />
      </Card>
    </Section>
  )
}

export default Homepage
