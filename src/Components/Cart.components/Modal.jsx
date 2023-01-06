import { FaTimes } from 'react-icons/fa';
import { useGlobalCartContext } from '../../Store/CartStore/Cart.context';
import ModelItem from './ModelItem';

function Modal({ openModal, closeCartModal }) {
  const {
    cartItems,
    totalCost,
    totalQty,
    addToCartHandler,
    removeFromCartHandler,
  } = useGlobalCartContext();

  return (
    <>
      <div className={`modal-overlay ${openModal ? 'show-modal' : ''}`}>
        <div className="modal-container">
          <h1 className="text-4xl pt-4">Cart Summary</h1>
          {cartItems.length === 0 ? (
            <h1 className="text-2xl text-red-900">
              You have not added any products to cart
            </h1>
          ) : (
            <div className="flex flex-col h-[100%] p-8">
              <div className="grid grid-cols-7 justify-items-start items-end space-y-6 gap-8 w-[100%] font-bold text-slate-600 underline mb-4">
                <p>Image</p>
                <p>Brand</p>
                <p>Name</p>
                <p>Price</p>
                <p>Qty</p>
                <p className="pl-2">Total</p>
                <p>Actions</p>
              </div>
              {cartItems.map((item, index) => (
                <ModelItem
                  key={index}
                  item={item}
                  addToCartHandler={addToCartHandler}
                  onClick={removeFromCartHandler.bind(null, item)}
                />
              ))}
              <div className="flex justify-between pr-4 mt-4">
                <p className="font-bold">Cart Qty: {totalQty}</p>
                <p className="font-bold">Total: $ {totalCost}</p>
              </div>
              <div className="flex justify-center items-center">
                <button className="btn btn-outline btn-warning">
                  Checkout
                </button>
              </div>
            </div>
          )}

          <button onClick={closeCartModal} className="close-modal-btn">
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
