import React from 'react'
import { Film, List } from 'lucide-react'

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabNavigation({
  activeTab,
  setActiveTab,
}: TabNavigationProps) {
  return (
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
  )
}
