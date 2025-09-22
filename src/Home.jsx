import { useState, useEffect } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';
import { CiPlay1 } from "react-icons/ci";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const Home = () => {
  const[searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  //Debounce the search term to prevent making too many API requests by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]); 

  const fetchMovies = async(query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      const endpointLatestMovies =   `${API_BASE_URL}/discover/movie?sort_by=release_date.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      const responseLatestMovies = await fetch(endpointLatestMovies, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      const dataLatestMovies = await responseLatestMovies.json();
      
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      if(dataLatestMovies.Response === 'False') {
        setErrorMessage(dataLatestMovies.Error || 'Failed to fetch latest movies');
        setLatestMovies([]);
        return;
      }

      setMovieList(data.results || []);
      setLatestMovies(dataLatestMovies.results || []);
      console.log("latest movie list: ", dataLatestMovies.results);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async() => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`);
    }
  }

  //rendering everytime the user search for a movie
  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  //rendering once when load the first time
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main className='pt-16'>
      <div className="relative w-full h-screen xs:-mt-[15%] md:-mt-[5%]">
          <img className="w-full h-full object-cover" src='./Tomb-raider.jpg' alt='Hero Banner'></img>
          <div className='px-10 absolute xs:-mt-[55%] md:-mt-[30%] xl:-mt-[22%] flex flex-col gap-3'>
            <h2 className="xs:text-4xl md:text-5xl xl:text-7xl adventure-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-600 bg-clip-text text-transparent">LARA &<br/> JONES</h2>
            <p className="xs:text-lg md:text-xl xl:text-2xl text-white">Lara races through Istanbul to uncover an ancient<br/> artifact before a secret society does.</p>
            <button className='flex items-center gap-1 text-lg bg-white px-5 py-2 rounded-4xl w-fit'><CiPlay1 className="size-6"/> Watch Now</button>
          </div>
            {/* <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      </div>
      
      <div className='wrapper'>
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )} 
        
        {latestMovies.length > 0 && (
          <section className='latest'>
            <h2>Latest Movies</h2>
            <ul>
              {latestMovies.map((movie) => (
                <li key={movie.id}>
                  <img 
                    src={movie.poster_path ? 
                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} 
                    alt={movie.title}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            </ul>
            )}
        </section>
      </div>  
    </main>
  )
}

export default Home