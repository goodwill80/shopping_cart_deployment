import { useEffect, useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useGlobalUtility } from '../../Store/Utility/Utility.context';

import Swal from 'sweetalert2';

function ViewList({ products, deleteAll, selectDelete }) {
  const { broardcastMessage } = useGlobalUtility();
  const [list, setList] = useState([]);
  const [prodsPerPage, setProdsPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(false);
  const redirect = useNavigate();

  // Pagination Logic
  const lastIndex = page * prodsPerPage;
  const firstIndex = lastIndex - prodsPerPage;
  const currentProdsOnPage = list.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(list.length / prodsPerPage);

  // Change Page Handler
  const changePage = (index) => {
    setPage(index);
  };

  // Toggle advance option
  const toggleOption = () => {
    setToggle(!toggle);
  };

  // Handle selected Product for deletion
  const handleSelectedChange = (index) => {
    const selectedItem = list[index];
    selectedItem.toDelete = !selectedItem.toDelete;
    setList((prev) => {
      const newList = [
        ...prev.map((item) =>
          item.index === index ? { ...selectedItem } : item
        ),
      ];
      return newList;
    });
  };

  // Remove Selected Products
  const removeSelected = (products) => {
    if (products.every((item) => !item.toDelete)) {
      broardcastMessage('No products selected');
      return;
    }
    const newList = [...products.filter((item) => !item.toDelete)];
    setList(() => [...newList.map((item) => ({ ...item, toDelete: false }))]);
    newList.map((item) => delete item.index);
    selectDelete([...newList]);
    setPage(1);
    broardcastMessage('Selected products successfully removed');
    redirect('/admin/view');
  };

  // Remove all
  const removeAllProds = () => {
    deleteAll();
    setList([]);
    setPage(1);
    redirect('/admin');
  };

  // Show confirmation then proceed to delete product
  const confirmationToDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!!!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeAllProds();
        Swal.fire(
          'Deleted!',
          'All your products have been deleted.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    setList(() => {
      const addIndexToProds = products.map((item, index) => ({
        ...item,
        index: index,
      }));
      return [...addIndexToProds];
    });
  }, [products]);

  useEffect(() => {
    setPage(1);
  }, [products]);

  return (
    <div className="flex mt-8 ml-[-10px] gap-32 items-baseline">
      {products.length > 0 ? (
        <div className="w-[300px]">
          <h3 className="text-gray-600 font-bold pb-4 text-xl ml-2">
            Product List
          </h3>
          {products.length > 0 && (
            <nav className="flex flex-col space-y-2 p-8 bg-gray-400 shadow-md rounded-md h-[220px]">
              {currentProdsOnPage.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-1"
                >
                  {toggle && (
                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <input
                          checked={item.toDelete}
                          onChange={() => handleSelectedChange(item.index)}
                          value={item.toDelete}
                          type="checkbox"
                          className="checkbox checkbox-accent checkbox-xs"
                        />
                      </label>
                    </div>
                  )}

                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-gray-600 block font-bold text-md'
                        : 'block text-white hover:text-blue-300'
                    }
                    to={`/admin/view/${item.id}`}
                  >
                    {toggle ? item.name : <li className="mb-2">{item.name}</li>}
                  </NavLink>
                </div>
              ))}
            </nav>
          )}

          <div className="flex justify-start items-center p-4 gap-3">
            <p className="text-xs font-bold">
              Page {page} of {numberOfPages}{' '}
            </p>
            {Array(numberOfPages)
              .fill(true)
              .map((item, index) => (
                <div
                  onClick={() => changePage(index + 1)}
                  key={index}
                  className={`rounded-xl h-3 w-3 cursor-pointer ${
                    page === index + 1 ? 'bg-green-900' : 'bg-green-300'
                  }  hover:bg-green-500`}
                ></div>
              ))}
          </div>
          <p
            onClick={toggleOption}
            className="pl-2 pb-3 text-orange-400 hover:text-red-400 cursor-pointer"
          >
            {toggle ? 'Close' : 'Open'} Advance Options
          </p>
          <div
            className={`${
              toggle ? '' : 'invisible'
            } flex gap-2 justify-center shadow-lg rounded-2xl p-4`}
          >
            <button
              onClick={() => removeSelected(list)}
              className="btn btn-outline text-red-600 btn-xs"
            >
              Remove Selected
            </button>
            <button
              onClick={confirmationToDelete}
              className="btn btn-outline text-red-600 btn-xs"
            >
              Remove All
            </button>
          </div>
        </div>
      ) : (
        <div className="min-w-[300px]">
          <p className="pl-2 text-orange-400">There are no products</p>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default ViewList;
