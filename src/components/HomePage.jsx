import React, { Fragment, useEffect, useState } from 'react'
import BooksGrid from './Books/BooksGrid'
import Header from './Header/Header'

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  const handleSort = (sortBy) => {
    setSortBy(sortBy)
  }
  // Load search and sort preferences from localStorage
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm")
    const savedSortBy = localStorage.getItem("sortBy")

    if (savedSearchTerm) setSearchTerm(savedSearchTerm)
    if (savedSortBy) setSortBy(savedSortBy)
  }, [])
  // Save search and sort preferences to localStorage
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm)
    localStorage.setItem("sortBy", sortBy)
  }, [searchTerm, sortBy])
  return (
    <Fragment>
      <Header
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortBy={sortBy}
        handleSort={handleSort}
      />
      <BooksGrid searchTerm={searchTerm} sortBy={sortBy} />
    </Fragment>
  )
}

export default HomePage