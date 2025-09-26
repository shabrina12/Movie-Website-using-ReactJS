import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavLinks = [
    {name: 'Horor', path: '/horor'},
    {name: 'Action', path: '/action'},
    {name: 'Adventure', path: '/adventure'},
    {name: 'Sci-Fi', path: '/scifi'},
    {name: 'Comedy', path: '/comedy'},
    {name: 'Romance', path: '/romance'},
    {name: 'Animation', path: '/animation'},
]

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [term, setTerm] = useState("");
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    function searchOnClick() {
        if (term.trim() === "") return;  // don’t search empty
        navigate(`/search?query=${encodeURIComponent(term)}`);
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 768) { //md breakpoint
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
    <div className={`navbar-wrapper ${isScrolled ? 'bg-[#030014] shadow-md' : 'bg-transparent'}`}>
        {/* Dekstop Menu */}
        {!isMenuOpen && (
        <div className='w-full flex justify-between items-center'>
            <h2 className='text-red-500'>
                <Link to="/">HYPER</Link>
            </h2>

            <ul className='hidden lg:flex text-white'>
            {NavLinks.map((link) => (
                <li key={link.name} className='mx-4 cursor-pointer hover:text-gray-500'>
                    <Link to={link.path}>
                        {link.name}
                    </Link>
                </li>
            ))}
            </ul>

            <SearchBar term={term} setTerm={setTerm} searchOnClick={searchOnClick} />
        </div>             
        )}    

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
            <div className="flex flex-col justify-center items-center w-full gap-3">
                <h2 className='text-red-500 hyper-text'>
                    <Link to="/">HYPER</Link>
                </h2>
                
                <ul className='text-white flex flex-col gap-2'>
                {NavLinks.map((link) => (
                    <li key={link.name} className='cursor-pointer hover:text-gray-500'>
                        <Link to={link.path}>
                            {link.name}
                        </Link>
                    </li>
                ))}
                </ul>

                {/* <div className='search-navbar flex items-center gap-2'>
                    <input placeholder="search movie.." className="w-4/5" />
                    <img src='search.svg' className="size-5" alt='search'  />
                </div> */}
            </div>
        )}

        {/* Mobile Search Button*/}
        {!isMenuOpen && (
            <SearchBar term={term} setTerm={setTerm} searchOnClick={searchOnClick} isMobile />
        )}

        {/* Mobile Menu Button*/}
        <button aria-labelledby='Menu Toggle Button' className="block lg:hidden fixed top-9 right-10 " onClick={toggleMenu}>
            {isMenuOpen ? (
                <XIcon className="size-6 text-white cursor-pointer" /> 
            ) : ( 
                <MenuIcon className="size-6 text-white cursor-pointer" /> 
            )}
        </button>
    </div>
  )
}

export default Navbar