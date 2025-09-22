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

function Adventure() {
    const [adventureMovies, setAdventureMovies] = useState([]);

    const fetchAdventureMovies = async() => {
      try {
        const endpoint = `${API_BASE_URL}/discover/movie?with_genres=12&sort_by=popularity.desc`;
        
        const response = await fetch(endpoint, API_OPTIONS);

        if(!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();

        if(data.Response === 'False') {
          console.log('Failed to fetch adventure movies');
          setAdventureMovies([]);
          return;
        }

        setAdventureMovies(data.results || []);
        console.log("adventure movie list: ", data.results); 
      } catch (error) {
        console.log('Erro fetching adventure movie list: ', error);
      } finally {
        console.log('finish');
        //setIsLoading(false);
      }
    }

    useEffect(() => {
      fetchAdventureMovies();
    }, []);

    return (
      <div className="px-5 pt-16 xs:p-10 max-w-7xl mx-auto">
        <section className='all-movies'>
          <h2>Adventure Movies</h2>

          <ul>
            {adventureMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>
      </div>
    )
}

export default Adventure