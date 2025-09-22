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

const Comedy = () => {
   const [comedyMovies, setComedyMovies] = useState([]);

    const fetchComedyMovies = async() => {
      try {
        const endpoint = `${API_BASE_URL}/discover/movie?with_genres=35&sort_by=popularity.desc`;
        
        const response = await fetch(endpoint, API_OPTIONS);

        if(!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();

        if(data.Response === 'False') {
          console.log('Failed to fetch comedy movies');
          setComedyMovies([]);
          return;
        }

        setComedyMovies(data.results || []);
        console.log("comedy movie list: ", data.results); 
      } catch (error) {
        console.log('Erro fetching comedy movie list: ', error);
      } finally {
        console.log('finish');
        //setIsLoading(false);
      }
    }

    useEffect(() => {
      fetchComedyMovies();
    }, []);

  return (
     <div className='pt-16'>
      <div className="relative w-full h-screen xs:-mt-[15%] md:-mt-[10%] xl:-mt-[5%]">
        <img className="w-full h-full object-cover" src='./comedy.jpg' alt='Comedy Banner'></img>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-8xl">Comedy</h2>
        <p className="text-4xl text-white">Movies</p>
      </div>

      <div className="px-5 py-12 xs:p-10">
        <section className='all-movies'>
          <ul>
            {comedyMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>
      </div>
      </div>
  )
}

export default Comedy