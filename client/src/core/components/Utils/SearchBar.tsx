import { useSearch } from '../../context/SearchContext';

import { 
  FaMagnifyingGlass as SearchIcon,
  FaCircleXmark  as ClearIcon
} from "react-icons/fa6";

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative border-l px-2 flex items-center font-poppins mx-6 transition-width duration-300 ease-in-out">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <SearchIcon className="text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleChange}
        className='pl-8 pr-10 py-1 font-light text-sm border rounded-lg outline-none focus:border-primary
        w-80 transition-width duration-300 ease-in-out truncate'
        style={{ maxWidth: '100%' }}
      />
      {searchTerm && (
        <div className="absolute inset-y-0 right-4 flex items-center">
          <ClearIcon
            size={12}
            className='text-gray-500 cursor-pointer'
            onClick={handleClear}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
