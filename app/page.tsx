'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, Minus, List, Film } from 'lucide-react'
import Image from 'next/image'

const apiKey = '1fd3f84e'

type Movie = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [activeTab, setActiveTab] = useState('search')

  useEffect(() => {
    const storedWatchlist = JSON.parse(
      localStorage.getItem('watchlist') || '[]'
    )
    setWatchlist(storedWatchlist)
  }, [])

  const searchMovies = async () => {
    if (!searchQuery.trim()) return
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          searchQuery
        )}`
      )
      const data = await response.json()
      if (data.Search) {
        setSearchResults(data.Search)
      } else {
        setSearchResults([])
        console.log('No results found')
      }
    } catch (error) {
      console.error('Error searching movies:', error)
      setSearchResults([])
    }
  }

  const addToWatchlist = async (imdbID: string) => {
    if (watchlist.some((movie) => movie.imdbID === imdbID)) return
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
    )
    const movie = await response.json()
    const updatedWatchlist = [...watchlist, movie]
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  const removeFromWatchlist = (imdbID: string) => {
    const updatedWatchlist = watchlist.filter(
      (movie) => movie.imdbID !== imdbID
    )
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchMovies()
    }
  }

  const MovieCard = ({
    movie,
    isWatchlist,
  }: {
    movie: Movie
    isWatchlist: boolean
  }) => (
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
      {isWatchlist ? (
        <button
          onClick={() => removeFromWatchlist(movie.imdbID)}
          className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <Minus size={18} className="mr-2" /> Remove
        </button>
      ) : (
        <button
          onClick={() => addToWatchlist(movie.imdbID)}
          className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <Plus size={18} className="mr-2" /> Add to Watchlist
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-600">
          Movie Watchlist
        </h1>
        <div className="flex mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter movie title"
            className="flex-grow p-2 text-lg text-black border-2 border-red-300 rounded-l-md focus:outline-none focus:border-red-500"
          />
          <button
            onClick={searchMovies}
            className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 transition-colors"
          >
            <Search size={24} />
          </button>
        </div>

        <div className="md:hidden flex mb-4">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2 ${
              activeTab === 'search'
                ? 'bg-red-500 text-white'
                : 'bg-white text-red-500'
            } rounded-l-md`}
          >
            <Film size={18} className="inline mr-2" /> Search Results
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`flex-1 py-2 ${
              activeTab === 'watchlist'
                ? 'bg-red-500 text-white'
                : 'bg-white text-red-500'
            } rounded-r-md`}
          >
            <List size={18} className="inline mr-2" /> Watchlist
          </button>
          <hr className="mt-4 border-red-300" />
        </div>

        <div className="md:flex md:space-x-8">
          <div
            className={`md:w-1/2 ${
              activeTab === 'search' ? 'block' : 'hidden md:block'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Search Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isWatchlist={false}
                />
              ))}
            </div>
          </div>
          <div className="hidden md:block w-px bg-red-300 mx-4"></div>
          <div
            className={`md:w-1/2 ${
              activeTab === 'watchlist' ? 'block' : 'hidden md:block'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Your Watchlist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {watchlist.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isWatchlist={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
