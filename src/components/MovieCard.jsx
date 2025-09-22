import React from 'react'

const MovieCard = ({movie: {title, vote_average, backdrop_path, release_date, original_language}}) => {
  return (
    <div className='movie-card'>
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
    </div>
  )
}

export default MovieCard