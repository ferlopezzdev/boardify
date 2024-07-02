import { FaAccusoft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SearchBar from "../Utils/SearchBar";

const Header: React.FC = () => {
    return (
        <header className="p-3 border-b shadow-sm animate-fade-down animate-duration-[200ms]">
            <div className="flex items-center ">
                <Link to='/home' className="flex items-center select-none hover:bg-gray-200 p-2 rounded transition-colors">
                    <FaAccusoft size={22} className="text-primary mr-2" />
                    <h1 className="text-sm font-semibold uppercase text-primary">
                        Boardify
                    </h1>
                </Link>
                <SearchBar />
            </div>
        </header>
    );
}

export default Header;
