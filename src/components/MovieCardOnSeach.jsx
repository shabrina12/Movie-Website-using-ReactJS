
const MovieCardOnSearch = ({movie: {title, vote_average, backdrop_path, overview, release_date}}) => {
  return (
    <div className='movie-card-search'>
        <img 
            src={backdrop_path ? 
                `https://image.tmdb.org/t/p/w500/${backdrop_path}` : '/no-movie.png'} 
            alt={title}
        />

        <div className='content'>
            <div className='flex items-center gap-6'>
                <h2>{title}</h2>
                <div className='rating'>
                    <img src='star.svg' alt='star icon' />
                    <p className='text-xl'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    {/* <p>{vote_average ? vote_average.toFixed(1) : 'N/A'} {vote_count > 0 ? 'from' : ''} {vote_count > 0 ? vote_count : ''}</p> */}
                </div>
            </div>

            <h4 className='text-lg'>{release_date ? release_date.substring(0,4) : ''}</h4>
            <p className='overview'>{overview}</p>
        </div>
    </div>
  )
}

export default MovieCardOnSearch