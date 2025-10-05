import React from 'react'
const DetailMovieCard = ({title, overview, vote_average, backdrop_path}) => {
  return (
        <div className="fixed top-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center px-12 rounded-lg w-210 h-136 text-center z-60">
            {/* Background image */}
            <img
              src={backdrop_path ? 
                `https://image.tmdb.org/t/p/w500/${backdrop_path}` : '/no-movie.png'}
              alt="Background"
              className="absolute rounded-lg inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay (darken image for readability) */}
            <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
            
            <div className='relative z-70 flex flex-col items-center text-white'>
              <h2 className="text-2xl font-bold mb-2">{title} </h2>
              <div className='flex gap-2 items-center'>
                <h2 className='text-xl'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</h2>
                <img className='size-5 object-contain' src='star.svg' alt='star icon' />
              </div>              
              
              <p className="text-xl text-white mt-4">{overview}</p>
            </div>
            
        </div>      
  )
}

export default DetailMovieCard