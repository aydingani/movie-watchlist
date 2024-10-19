import React from 'react'
import MovieCard from './MovieCard'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

interface SearchResultsProps {
  searchResults: Movie[]
  addToWatchlist: (imdbID: string) => void
  activeTab: string
}

export default function SearchResults({
  searchResults,
  addToWatchlist,
  activeTab,
}: SearchResultsProps) {
  return (
    <div
      className={`md:w-1/2 ${
        activeTab === 'search' ? 'block' : 'hidden md:block'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-red-600">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {searchResults.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isWatchlist={false}
            onAction={addToWatchlist}
          />
        ))}
      </div>
    </div>
  )
}
