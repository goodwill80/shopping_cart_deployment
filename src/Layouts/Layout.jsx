import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import Modal from '../Components/Cart.components/Modal';

function LayoutComponent({ children }) {
  const [openModal, setOpenModal] = useState(false);

  const openCartModal = () => {
    setOpenModal(true);
  };

  const closeCartModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col relative">
      <Navbar openCartModal={openCartModal} closeCartModal={closeCartModal} />
      {children}
      <Outlet />
      {/* CART MODAL */}
      <Modal openModal={openModal} closeCartModal={closeCartModal} />
      <Footer />
    </div>
  );
}

export default LayoutComponent;
