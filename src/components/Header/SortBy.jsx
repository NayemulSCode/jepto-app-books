import React from 'react'

const SortBy = ({sortBy, handleSort}) => {
  return (
    <div className="flex items-stretch space-x-3">
      <select
        className="cursor-pointer rounded-md border px-4 py-2 text-center text-gray-600"
        name="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="genre_topic">Genre/Topic</option>
      </select>
    </div>
  )
}

export default SortBy