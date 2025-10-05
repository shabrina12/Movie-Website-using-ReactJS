import { useState } from "react";
import DetailMovieCard from "./DetailMovieCard";

const MovieCard = ({movie: {title, backdrop_path, overview, vote_average}}) => {
    const [show, setShow] = useState(false);

  return (
    <div className='movie-card' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <img 
            src={backdrop_path ? 
                `https://image.tmdb.org/t/p/w500/${backdrop_path}` : '/no-movie.png'} 
            alt={title}
        />

        <div className='relative bottom-10 text-center'>
            <h3>{title}</h3>

            <div className='content'>
                {/* <div className='rating'>
                    <img src='star.svg' alt='star icon' />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div> */}

                {/* <span>•</span>
                <p className='lang'>{original_language}</p>
                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p> */}
            </div>
        </div>

        {show && (
            <DetailMovieCard title={title} overview={overview} vote_average={vote_average} backdrop_path={backdrop_path} />
        )}
    </div>
  )
}

export default MovieCard