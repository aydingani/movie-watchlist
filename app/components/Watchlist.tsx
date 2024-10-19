import React from 'react'
import MovieCard from './MovieCard'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

interface WatchlistProps {
  watchlist: Movie[]
  removeFromWatchlist: (imdbID: string) => void
  activeTab: string
}

export default function Watchlist({
  watchlist,
  removeFromWatchlist,
  activeTab,
}: WatchlistProps) {
  return (
    <div
      className={`md:w-1/2 ${
        activeTab === 'watchlist' ? 'block' : 'hidden md:block'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-red-600">Your Watchlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isWatchlist={true}
            onAction={removeFromWatchlist}
          />
        ))}
      </div>
    </div>
  )
}
