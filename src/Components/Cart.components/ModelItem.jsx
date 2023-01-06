import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';

function ModelItem({ item, onClick, addToCartHandler }) {
  const { name, brand, price, image, count } = item;
  const keys = [...new Array(item.instock + 1).keys()].filter(
    (num) => num !== 0
  );
  const [qty, setQty] = useState(0);

  useEffect(() => {
    setQty(count);
  }, [count]);

  const handleChange = (e) => {
    setQty(e.target.value);
  };

  return (
    <>
      <div className="grid grid-cols-7 justify-items-start items-end space-y-6 gap-8 w-[100%]">
        <img
          className="w-[40px] h-[35px] rounded-md shadow-lg"
          src={require(`../../Assets/images/${image}`)}
          alt={name}
        />
        <p>{brand}</p>
        <p>{name}</p>
        <p>$ {price}</p>
        {/* <p className="ml-2">{count}</p> */}
        <select value={qty} onChange={handleChange}>
          {keys.map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </select>

        <p className="">$ {`${(price * count).toFixed(2)}`}</p>
        <div className="flex gap-4 justify-center items-center pl-2">
          <button
            className="text-green-600"
            onClick={() => addToCartHandler({ ...item, count: parseInt(qty) })}
          >
            <GrUpdate />
          </button>
          <button onClick={onClick}>
            <FaTimes color={'maroon'} />
          </button>
        </div>
      </div>
      <hr className="mt-4 border-t-amber-300" />
    </>
  );
}

export default ModelItem;
