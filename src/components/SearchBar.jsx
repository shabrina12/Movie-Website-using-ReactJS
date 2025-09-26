import { Search } from "lucide-react";

const SearchBar = ({term, setTerm, searchOnClick, isMobile = false}) => {
  return (
    <div className={`search-navbar items-center bg-gray-800 rounded-lg
        ${isMobile ? "flex lg:hidden mr-10" : "hidden lg:flex"}`}>

        <input type="text" placeholder="Search..." className="text-white px-6 focus:outline-none" 
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    searchOnClick();
                }
        }}/>
        <Search onClick={searchOnClick} className="size-6 text-white cursor-pointer mr-4"/>
    </div>
  )
}

export default SearchBar