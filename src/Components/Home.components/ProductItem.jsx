import { useGlobalCartContext } from '../../Store/CartStore/Cart.context';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

function ProductItem({ product }) {
  const { addToCartHandler } = useGlobalCartContext();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <Link to={`/product/${product.id}`}>
          <span className="w-[350px] h-[300px]">
            <img
              src={require(`../../Assets/images/${product.image}`)}
              alt={product.name}
              className="rounded shadow w-[320px] h-[280px]"
            />
          </span>
        </Link>
        <div className="flex flex-col items-center justify-center p-5">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="mb-2">{product.brand}</p>
          <p>${product.price}</p>
          <button
            onClick={() => addToCartHandler(product)}
            className="primary-button"
            type="button"
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductItem;
