const CartItem = props => {
  const price = props.price.toFixed(2)

  return (
    <li className="grid grid-cols-1 gap-6 border-b-neutral-700 border-b-2 last:border-b-0 py-4 first:pt-0">
      <div className="grid grid-cols-1 gap-2">
        <h2 className="font-bold text-lg">{props.name}</h2>
        <h3 className="line-clamp-3 text-white/70">{props.description}</h3>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-yellow-500 font-medium">P{price}</span>
        <div className="flex items-center gap-2"></div>
      </div>
    </li>
  )
}

export default CartItem
