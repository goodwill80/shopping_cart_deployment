import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import SearchForm from '../Components/Home.components/SearchForm';
import ProductList from '../Components/Home.components/ProductList';
import ProductFilter from '../Components/Home.components/ProductFilter';

function HomePage({ products }) {
  const [filteredProds, setFilteredProds] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setFilteredProds(() => [...products]);
  }, []);

  const handleSearchFormChange = (e) => {
    setQuery(() => e.target.value);
  };

  const search = (query) => {
    if (query === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter some text in search field',
      });
    }
    const prods = products.filter(
      (item) =>
        item.name.toLowerCase().trim().includes(query.toLowerCase().trim()) ||
        item.brand.toLowerCase().trim().includes(query.toLowerCase().trim()) ||
        item.description
          .toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim())
    );
    setFilteredProds((prev) => {
      if (prods.length > 0) {
        setQuery('');
        return prods;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No results found',
      });
      return prev;
    });
  };

  const filterByPrice = (prods, condition = 'all') => {
    switch (condition) {
      case 'all':
        setFilteredProds([...prods]);
        break;
      case 'less_than_500':
        const filter1 = prods.filter((item) => item.price < 500);
        setFilteredProds([...filter1]);
        break;
      case 'between_500_to_1000':
        const filter2 = prods.filter(
          (item) => item.price >= 500 && item.price < 1000
        );
        setFilteredProds([...filter2]);
        break;
      case 'more_than_1000':
        const filter3 = prods.filter((item) => item.price > 1000);
        setFilteredProds([...filter3]);
        break;
      default:
        setFilteredProds([...prods]);
        break;
    }
  };

  return (
    <div className="flex flex-col h-auto justify-center items-center min-h-[75vh]">
      {products.length > 0 ? (
        <>
          <h1 className="p-12 text-4xl font-bold">Featured Products</h1>
          <SearchForm
            handleSearchFormChange={handleSearchFormChange}
            query={query}
            search={search}
          />
          <ProductFilter filterByPrice={filterByPrice.bind(null, products)} />
          {filteredProds.length <= 0 ? (
            <div className="min-h-[35vh] h-auto">
              <p className="font-bold pt-4 text-red-300">
                There is no products at this price range
              </p>
            </div>
          ) : (
            <ProductList products={filteredProds} />
          )}
        </>
      ) : (
        <>
          <p>There are currently no products on display</p>
        </>
      )}
    </div>
  );
}

export default HomePage;
