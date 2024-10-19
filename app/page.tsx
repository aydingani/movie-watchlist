'use client'

import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import TabNavigation from './components/TabNavigation'
import SearchResults from './components/SearchResults'
import Watchlist from './components/Watchlist'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-600">
          Movie Watchlist
        </h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchMovies={searchMovies}
          handleKeyPress={handleKeyPress}
        />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="md:flex md:space-x-8">
          <SearchResults
            searchResults={searchResults}
            addToWatchlist={addToWatchlist}
            activeTab={activeTab}
          />
          <div className="hidden md:block w-px bg-red-300 mx-4"></div>
          <Watchlist
            watchlist={watchlist}
            removeFromWatchlist={removeFromWatchlist}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  )
}
