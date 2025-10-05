import React from 'react'
const DetailMovieCard = ({title, overview, vote_average, backdrop_path}) => {
  return (
        <div className="fixed xs:top-[30%] md:top-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center xs:px-4 md:px-8 lg:px-12 rounded-lg xs:w-100 xs:h-90 md:w-140 md:h-120 lg:w-180 lg:h-116 xl:w-210 xl:h-136 text-center z-60">
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
              <h2 className="xs:text-xl md:text-2xl lg:text-3xl font-bold mb-2">{title} </h2>
              <div className='flex gap-2 items-center'>
                <h2 className='xs:text-lg md:text-xl lg:text-2xl'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</h2>
                <img className='size-5 object-contain' src='star.svg' alt='star icon' />
              </div>              
              
              <p className="xs:text-md md:text-lg lg:text-xl text-white mt-4">{overview}</p>
            </div>
            
        </div>      
  )
}

export default DetailMovieCard