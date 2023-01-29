function ProductFilter({ filterByPrice }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3 mb-6 md:flex-row">
        <button
          onClick={() => filterByPrice('all')}
          className="w-[250px] px-8 font-bold border border-red-400 p-2 rounded-lg text-red-400 hover:text-red-600 hover:border-red-600 md:w-[150px]"
        >
          All
        </button>
        <button
          onClick={() => filterByPrice('less_than_500')}
          className="w-[250px] font-bold border border-amber-400 p-2 rounded-lg text-amber-400 hover:text-amber-600 hover:border-amber-600 md:w-[150px]"
        >
          Less than $500
        </button>
        <button
          onClick={() => filterByPrice('between_500_to_1000')}
          className="w-[250px] font-bold border border-blue-400 p-2 rounded-lg text-blue-400 hover:text-blue-600 hover:border-blue-600 md:w-[150px]"
        >
          $500 to $1000
        </button>
        <button
          onClick={() => filterByPrice('more_than_1000')}
          className="w-[250px] font-bold border border-green-400 p-2 rounded-lg text-green-400 hover:text-green-600 hover:border-green-600 md:w-[150px]"
        >
          > $1000
        </button>
      </div>
    </div>
  );
}

export default ProductFilter;
