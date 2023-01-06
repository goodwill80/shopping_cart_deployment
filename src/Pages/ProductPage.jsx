import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGlobalCartContext } from '../Store/CartStore/Cart.context';

function ProductPage({ products }) {
  // id from params is a string, while id in products is number
  const { id } = useParams();
  const [number, setNumber] = useState(0);
  const { addToCartHandler, removeFromCartHandler, cartItems } =
    useGlobalCartContext();

  // retrieve product information on page
  const product = products.find((item) => item.id === parseInt(id));
  const { name, brand, price, instock, image, category, description } = product;

  // Check if product is already in cart and update dropdown value
  const cartItemexist = cartItems.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (cartItemexist) setNumber(cartItemexist.count);
  }, []);

  // dynamic dropdown that reflect outstanding stock of product
  const keys = [...new Array(instock + 1).keys()];
  const qty = cartItemexist ? keys.filter((num) => num !== 0) : keys;

  // Handle change of quantity dropdown
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  // Handle remove item from cart
  const removeFromCart = (item) => {
    removeFromCartHandler(item);
    setNumber(0);
  };

  return (
    <div className="px-20 min-h-[73vh] h-auto">
      <div>
        <Link to="/">
          <span className="font-sans text-cyan-600">Back to products</span>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 mt-10">
        {/* Occupy 2 columns of the parent */}
        <div className="md:col-span-2 m-auto shadow-2xl rounded-md">
          <img
            className="h-[500px] w-[550px] rounded-md"
            src={require(`../Assets/images/${image}`)}
            alt={name}
          />
        </div>
        {/* 3rd Column */}
        <div className="mt-[50px]">
          <ul>
            <li>
              <h1 className="text-lg font-bold mb-4">{name}</h1>
            </li>
            <li>Category: {category}</li>
            <li>Brand: {brand}</li>
            <li>Description: {description}</li>
          </ul>
        </div>
        {/* 4th Column */}
        <div className="mt-[50px]">
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{instock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <div className="flex justify-between mb-4">
              <label htmlFor="number-dd">
                <p>Current Qty</p>
              </label>
              <select
                className="w-18"
                id="number-dd"
                name="number"
                value={number}
                onChange={handleChange}
              >
                {qty.map((num, index) => (
                  <option key={index} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() =>
                addToCartHandler({ ...product, count: parseInt(number) })
              }
              className="primary-button w-full"
              disabled={number < 1 ? true : false}
            >
              {cartItemexist ? 'Update Cart' : 'Add to Cart'}
            </button>
            {cartItemexist ? (
              <button
                onClick={() => removeFromCart(cartItemexist)}
                className="secondary-button w-full mt-2"
              >
                Remove
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
