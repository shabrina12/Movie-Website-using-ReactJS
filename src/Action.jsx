import { useEffect, useState } from "react";
import MovieCard from './components/MovieCard.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const Action = () => {
      const [actionMovies, setActionMovieList] = useState([]);
    
      const fetchActionMovies = async() => { 
        try {
          const endpoint = `${API_BASE_URL}/discover/movie?with_genres=28&sort_by=popularity.desc`;
            
          const response = await fetch(endpoint, API_OPTIONS);
      
          if(!response.ok) {
            throw new Error('Failed to fetch movies');
          }
      
          const data = await response.json();
            
          if(data.Response === 'False') {
            console.log('Failed to fetch action movies');
            setActionMovieList([]);
            return;
          }
    
          setActionMovieList(data.results || []);
          console.log("action movie list: ", data.results);  
        } catch (error) {
          console.error(`Error fetching movies: ${error}`);
        } finally {
          console.log('finish');
          //setIsLoading(false);
        }
      }
    
      useEffect(() => {
        fetchActionMovies();
      }, []);

  return (
    <div className='pt-16'>
      <div className="relative w-full h-screen xs:-mt-[15%] md:-mt-[10%] xl:-mt-[5%]">
        <img className="w-full h-full object-cover" src='./action-bg.jpeg' alt='Action Banner'></img>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-8xl">Action</h2>
        <p className="text-4xl text-white">Movies</p>
      </div>

      <div className="px-5 py-12 xs:p-10 mt-8">
        <section className='all-movies'>
          <ul>
            {actionMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Action