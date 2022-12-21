import { Button, Input, Modal, TextArea } from '../UI/IgmtInk'
import { useInput, useHttp } from '../../hooks/hooks-igmtink'

const FoodForm = props => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: hasErrorName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset
  } = useInput('', value => value.trim() !== '')

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: hasErrorDescription,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: descriptionReset
  } = useInput('', value => value.trim() !== '')

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: hasErrorPrice,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: priceReset
  } = useInput(0, value => value > 0)

  const { isLoading, error, sendRequest: addProduct } = useHttp()

  const addedProduct = (product, productData) => {
    const generatedId = productData.name
    const createdProduct = { id: generatedId, ...product }

    props.onAddProduct(createdProduct)
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!nameIsValid || !descriptionIsValid || !priceIsValid) {
      nameBlurHandler()
      descriptionBlurHandler()
      priceBlurHandler()
      console.log('Invalid')
      return
    }

    addProduct(
      {
        url: 'https://project-food-app-v2-igmtink-default-rtdb.firebaseio.com/foods.json',
        method: 'POST',
        body: {
          name: nameValue,
          description: descriptionValue,
          price: +priceValue
        },
        headers: { 'Content-Type': 'application/json' }
      },
      addedProduct.bind(null, {
        name: nameValue,
        description: descriptionValue,
        price: +priceValue
      })
    )

    nameReset()
    descriptionReset()
    priceReset()

    props.onAddProductShow()
  }

  return (
    <Modal className="bg-neutral-800 p-4 grid grid-cols-1 gap-6 animate-slide-down">
      <h1 className="text-yellow-500 font-bold text-2xl">Add Product</h1>
      <form onSubmit={submitHandler} className="grid grid-cols-1 gap-4">
        <Input
          className={`bg-neutral-900 rounded-md p-2 ${
            hasErrorName &&
            'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
          }`}
          attr={{
            placeholder: 'Name',
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
            value: nameValue
          }}
        />
        <TextArea
          className={`bg-neutral-900 rounded-md p-2 ${
            hasErrorDescription &&
            'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
          }`}
          attr={{
            rows: 8,
            onChange: descriptionChangeHandler,
            onBlur: descriptionBlurHandler,
            placeholder: 'Description',
            value: descriptionValue
          }}
        />
        <div className="flex gap-4">
          <Input
            className={`bg-neutral-900 rounded-md p-2 text-center ${
              hasErrorPrice &&
              'bg-red-500 outline-red-900 outline-2 outline-none placeholder-black'
            }`}
            attr={{
              placeholder: 'Price',
              type: 'number',
              onChange: priceChangeHandler,
              onBlur: priceBlurHandler,
              min: 0,
              value: priceValue
            }}
          />
          <Button
            className="bg-yellow-500 hover:bg-yellow-500/75 text-neutral-900 font-bold rounded-md py-2 px-4"
            attr={{ type: 'submit' }}
          >
            {isLoading ? 'Sending...' : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default FoodForm
