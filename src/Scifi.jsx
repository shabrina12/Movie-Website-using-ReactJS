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
const Scifi = () => {
  const [scifiMovies, setScifiMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchScifiMovies = async(pageNumber) => {
    setIsLoading(true);

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?with_genres=878&sort_by=popularity.desc&page=${pageNumber}`;
        
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.Response === 'False') {
        console.log('Failed to fetch scifi movies');
        setScifiMovies([]);
        return;
      }

      //setScifiMovies(data.results || []);
      setScifiMovies((prevMovies) => [...prevMovies, ...data.results]);
      setHasMore(data.page < data.total_pages);
      console.log("scifi movie list: ", data.results); 
    } catch (error) {
      console.log('Erro fetching scifi movie list: ', error);
    } finally {
      console.log('finish');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    const load = async() => {
      if(!ignore) await fetchScifiMovies(page);
    }

    load();
    return() => { ignore = true };
  }, [page]);


  const handleLoadMore = () => {
    if(hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className='pt-16'>
      <div className="relative w-full h-screen xs:-mt-[15%] md:-mt-[10%] xl:-mt-[5%]">
        <img className="w-full h-full object-cover" src='./scifi.jpg' alt='Sci-fi Banner'></img>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-8xl">Sci-fi</h2>
        <p className="text-4xl text-white">Movies</p>
      </div>

      <div className="px-5 py-12 xs:p-10 mt-8">
        <section className='all-movies'>
          <ul>
            {scifiMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>

        <div className='flex justify-center'>
        {hasMore && !isLoading && (
          <button className='my-6 text-gray-200 text-lg py-2 rounded-4xl bg-red-950 xs:w-[40%] md:w-[30%] lg:w-[20%] xl:w-[12%] cursor-pointer' onClick={handleLoadMore}>Load More</button>
        )}
        </div>

        {isLoading && <p className="my-6 text-gray-200 text-lg text-center">Load more movies...</p>}
      
        {/* End of List */}
        {!hasMore && !isLoading && (
          <p className="my-6 text-center text-gray-400 text-lg">No more movies 🎬</p>
        )}
      </div>
      </div>
  )
}

export default Scifi