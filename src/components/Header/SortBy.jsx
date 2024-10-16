import React from 'react'

const SortBy = ({sortBy, handleSort}) => {
  return (
      <select
        className="cursor-pointer rounded-md border  px-4  py-2 text-gray-600 border-[#1a73e8]"
        name="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value=""  >---Sort---</option>
        <option value="genre_topic">Genre/Topic</option>
      </select>
   
  )
}

export default SortBy