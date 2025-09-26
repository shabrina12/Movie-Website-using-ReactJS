import { useEffect, useState } from "react";
//import { useDebounce } from 'react-use';
import { useSearchParams } from "react-router-dom";
import Spinner from './components/Spinner.jsx';
import MovieCardOnSearch from "./components/MovieCardOnSeach.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
        
    //Debounce the search term to prevent making too many API requests by waiting for the user to stop typing for 500ms
    //useDebounce(() => setDebounceSearchTerm(setTerm), 500, [setTerm]); 

    const fetchMovies = async(query = '') => {
        setIsLoading(true);
        setErrorMessage('');
    
        try {
          const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
          
          const response = await fetch(endpoint, API_OPTIONS);
    
          if(!response.ok) {
            throw new Error('Failed to fetch movies');
          }
    
          const data = await response.json();
          
          if(data.Response === 'False') {
            setErrorMessage(data.Error || 'Failed to fetch movies');
            setMovieList([]);
            return;
          }
    
          setMovieList(data.results || []);
    
          // if(query && data.results.length > 0) {
          //   await updateSearchCount(query, data.results[0]);
          // }
        } catch (error) {
          console.error(`Error fetching movies: ${error}`);
          setErrorMessage('Error fetching movies. Please try again later');
        } finally {
          setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(query);
    }, [query]);

  return (
    <div className='pt-26'>
      <div className="flex mt-20 px-10">
        <h2 className="text-4xl">Results found: {query}</h2>
      </div>

      <div className="px-5 py-12 xs:p-10 mt-8">
        <section>
          {/* <h2 className='mb-6'>All Movies</h2> */}

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
            {movieList.map((movie) => (
              <MovieCardOnSearch key={movie.id} movie={movie} />
            ))}
            </ul>
            )}
        </section>
      </div>
    </div>
  )
}

export default SearchResult