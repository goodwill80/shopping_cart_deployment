import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalProductContext } from '../../Store/ProductStore/Product.context';
import { useGlobalUtility } from '../../Store/Utility/Utility.context';

import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

function ProductCard({ products }) {
  const { deleteProduct, setIsEditing, setForm } = useGlobalProductContext();
  const { broardcastMessage } = useGlobalUtility();
  const redirect = useNavigate();
  const { id } = useParams();
  const product = products.find((item) => parseInt(item.id) === parseInt(id));

  // Delete Handler
  const deleteHandler = (prod) => {
    deleteProduct(prod);
    broardcastMessage(`${prod.name} successfully deleted`);
    redirect('/admin/view');
  };

  // Show confirmation then proceed to delete product
  const confirmationToDelete = (prod) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHandler(prod);
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    });
  };

  // OnEdit Mode
  const setEditMode = (id) => {
    setIsEditing(true);
    setForm(product);
    redirect(`/admin/view/edit/${id}`);
  };

  if (!product) {
    return (
      <div>
        <h2>There is no product of the above id</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="text-lg font-bold">Product Information</h3>
        <div className="shadow-lg w-[580px] min-h-[360px] h-auto p-8 mt-4 rounded-lg flex flex-col">
          <div className="flex justify-between">
            <img
              src={require(`../../Assets/images/${product.image}`)}
              alt={product.name}
              className="w-[250px] h-[200px] shadow-xl"
            />
            <div className="mr-16 w-[180px]">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="font-bold text-gray-400 mt-2">{product.brand}</p>
              <div className="flex justify-between items-baseline">
                <p className="mt-2 font-bold">Category: </p>
                <p>{product.category}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="mt-2 font-bold">Price: </p>
                <p>${product.price}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="mt-2 font-bold">Discount: </p>
                <p>{product.discount}%</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="mt-2 font-bold">Quantity: </p>
                <p>{product.instock}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-md font-bold mt-4">Description:</h1>
            <p className="mt-2 text-gray-500">{product.description}</p>
          </div>
          <div className="flex gap-2 items-baseline mt-3 justify-end">
            <button
              onClick={() => setEditMode(product.id)}
              className="btn btn-warning btn-sm text-white"
            >
              Edit
            </button>
            <button
              onClick={() => confirmationToDelete(product)}
              className="btn btn-error btn-sm text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
