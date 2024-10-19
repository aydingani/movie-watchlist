import React from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchMovies: () => void
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchMovies,
  handleKeyPress,
}: SearchBarProps) {
  return (
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
  )
}
