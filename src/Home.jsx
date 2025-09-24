import { useState, useEffect, useRef } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
  const swiperRef = useRef(null);

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

  const slides = [
    {
      image: './Tomb-raider.jpg',
      title: 'LARA &',
      title2: 'JONES',
      desc: 'Lara races through Istanbul to uncover an ancient artifact before a secret society does.',
      button: "Watch Now"
    },
    {
      image: './avatar.jpg',
      title: 'AVATAR',
      desc: ' Set on the alien moon of Pandora in the mid-22nd century, Avatar unfolds a narrative that intertwines environmentalism, colonialism, and the clash of civilizations.',
      button: "Watch Now"
    },
    {
      image: './lalaland.jpg',
      title: 'LALALAND',
      desc: ' Two lost, creative souls trying to make in Los Angeles find refuge in each other.',
      button: "Watch Now"
    },
  ];

  return (
    <main className='pt-16'>
      <div className="relative w-full h-screen xs:-mt-[15%] md:-mt-[9%] lg:-mt-[7%] xl:-mt-[5%]">
        <Swiper modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev"
            }}
            pagination={{clickable: true}}
            autoplay={{ delay: 4000 }}
            loop
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className='w-full h-full object-cover'
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <img className="w-full h-full object-cover" src={slide.image} alt={slide.title}></img>
              <div className='xs:w-full md:w-[70%] lg:w-[50%] px-10 absolute xs:-mt-[50%] s:-mt-[40%] md:-mt-[30%] xl:-mt-[20%] flex flex-col gap-4'>
                <h2 className="xs:text-4xl md:text-5xl xl:text-7xl adventure-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-600 bg-clip-text text-transparent">{slide.title}<br/>{slide.title2}</h2>
                <p className="xs:text-lg md:text-xl xl:text-2xl text-white">{slide.desc}</p>
                <button className='flex items-center gap-1 text-lg bg-white px-5 py-2 rounded-4xl w-fit cursor-pointer'><CiPlay1 className="size-6"/> {slide.button}</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Arrows */}
        <button onClick={() => swiperRef.current?.slidePrev()} className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl cursor-pointer">
          <MdOutlineNavigateBefore />
        </button>
        <button onClick={() => swiperRef.current?.slideNext()} className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl cursor-pointer">
          <MdOutlineNavigateNext />
        </button>

          {/* <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      </div>
      
      <div className='wrapper'>
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Top Watched Movies</h2>
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