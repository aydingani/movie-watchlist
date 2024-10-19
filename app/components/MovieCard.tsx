import React from 'react'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

interface MovieCardProps {
  movie: Movie
  isWatchlist: boolean
  onAction: (imdbID: string) => void
}

export default function MovieCard({
  movie,
  isWatchlist,
  onAction,
}: MovieCardProps) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <Image
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        width={300}
        height={450}
        className="w-full h-48 object-cover mb-4 rounded"
        onError={(e) => {
          e.currentTarget.src = '/placeholder.svg?height=450&width=300'
        }}
      />
      <h3 className="text-lg text-black font-semibold mb-2 line-clamp-1">
        {movie.Title}
      </h3>
      <p className="text-gray-600 mb-4">{movie.Year}</p>
      <button
        onClick={() => onAction(movie.imdbID)}
        className={`w-full ${
          isWatchlist
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-green-500 hover:bg-green-600'
        } text-white p-2 rounded flex items-center justify-center transition-colors`}
      >
        {isWatchlist ? (
          <>
            <Minus size={18} className="mr-2" /> Remove
          </>
        ) : (
          <>
            <Plus size={18} className="mr-2" /> Add to Watchlist
          </>
        )}
      </button>
    </div>
  )
}
