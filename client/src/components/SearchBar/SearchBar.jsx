import { FaSearch } from 'react-icons/fa';
import { useSearch } from '../../context/SearchContext';

const SearchBar = () => {

    const { searchQuery, setSearchQuery } = useSearch();

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

  return (
    <div className="flex items-center bg-white rounded-md min-w-96 px-6 py-2 ml-12 shadow-md">
        <FaSearch className='mr-5 text-gray-500' />
      <input
        type="text"
        placeholder="Buscar..."
        className="outline-none bg-transparent flex-grow font-sans text-[16px]
        focus:scale-x-105 focus:text-gray-500 transition-all 
        placeholder:text-gray-500 focus:placeholder:text-gray-500"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
