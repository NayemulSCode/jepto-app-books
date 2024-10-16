import React, { Fragment, useState } from 'react'
import BooksGrid from './Books/BooksGrid'
import Header from './Header/Header'

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };
  return (
    <Fragment>
        <Header 
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            sortBy={sortBy}
            handleSort={handleSort}
        />
        <BooksGrid 
            searchTerm={searchTerm} 
            sortBy={sortBy}
        />
    </Fragment>
  )
}

export default HomePage