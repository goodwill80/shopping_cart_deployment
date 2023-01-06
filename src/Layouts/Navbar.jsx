import { Link } from 'react-router-dom';
import { FaDev } from 'react-icons/fa';
import { BsFillCartFill } from 'react-icons/bs';
import { useGlobalCartContext } from '../Store/CartStore/Cart.context';

function Navbar({ openCartModal }) {
  const { totalQty } = useGlobalCartContext();
  return (
    <>
      <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content sticky top-0 z-20">
        <div className="container mx-auto">
          {/* LOGO & TITLE */}
          <div className="flex flex-row justify-center items-center px-2 mx2">
            <FaDev className="inline pr-2 text-3xl" size={35} />
            <Link to="/" className="text-lg font-bold align-middle">
              Dev Market
            </Link>
          </div>
          {/* LINKS */}
          <div className="flex-1 px-2 mx-2">
            <div className="flex justify-end">
              <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
                Home
              </Link>
              <Link to="/signin" className="btn btn-ghost btn-sm rounded-btn">
                Login
              </Link>
              <Link to="/admin" className="btn btn-ghost btn-sm rounded-btn">
                Admin
              </Link>
              {/* SHOPPING CART */}
              <div className="btn btn-ghost btn-sm rounded-btn relative">
                <div onClick={openCartModal}>
                  <BsFillCartFill size={20} />
                </div>
                <div className="absolute top-1 left-7 bg-red-600 rounded-xl py-1 px-2">
                  <h3 className="text-xs">{totalQty}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
