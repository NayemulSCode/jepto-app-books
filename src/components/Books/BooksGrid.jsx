import React, { useEffect, useState } from 'react';
import BooksGridItem from './BooksGridItem';

const BooksGrid = ({searchTerm, sortBy}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const BOOKS_PER_PAGE = 32;

  useEffect(() => {
    const fetchBooks = async (page) => {
      try {
        setLoading(true);
        const response = await fetch(`https://gutendex.com/books?page=${page}`);
        const data = await response.json();
        setBooks(data.results); // 'results' contains the books
        setTotalPages(Math.ceil(data.count / BOOKS_PER_PAGE)); // Total number of pages
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the book data:', error);
        setLoading(false);
      }
    };

    fetchBooks(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Logic for book filter by searching with books title
  const filterBySearch = (book) => {
    if (searchTerm !== "") {
      return book?.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  };
  // Logic for book sorting by topics
  const sortByGenre = (a, b) => {
    switch (sortBy) {
      case "genre_topic":
        // Sort by the genre alphabetically, fallback to 'Unknown' if genre is missing
        const genreA = a.subjects ? a.subjects.join(', ') : 'Unknown';
        const genreB = b.subjects ? b.subjects.join(', ') : 'Unknown';
        return genreA.localeCompare(genreB);
      default:
        return 0;
    }
  };
  // Logic for showing ellipses and page numbers
  const getPagination = () => {
    let pages = [];
    const lastFivePages = totalPages - 4;

    if (totalPages <= 7) {
      // If total pages are less than or equal to 7, show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 4) {
      // If on the first 4 pages, show first 4 pages and last 5 pages
      pages = [1, 2, 3, 4, '...', lastFivePages, totalPages];
    } else if (currentPage > 4 && currentPage < lastFivePages) {
      // If on a middle page, show first 1 page, ellipsis, surrounding pages, ellipsis, and last 5 pages
      pages = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        lastFivePages,
        totalPages,
      ];
    } else {
      // If on or after the last 5 pages, show the first page, ellipsis, and the last 5 pages
      pages = [1, '...', lastFivePages, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return pages;
  };

  if (loading) {
    return <div className='w-full flex justify-center bg-[#1f6dc7]' ><img src="/loading-animations-preloader.gif" alt="Loading Books..." /></div>;
  }

  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 gap-8 gap-y-12 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books
          .filter(filterBySearch)
          .sort(sortByGenre)
          .map((book) => (
            <BooksGridItem
              key={book.id}
              id={book.id}
              name={book.title}
              bookObj={book}
              author={book.authors.map((author) => author.name).join(', ')}
              thumbnail={book.formats['image/jpeg']}
              genre={book.subjects ? book.subjects.join(', ') : 'Unknown'}
            />
          ))}
      </div> 
      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-4">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Previous
        </button>

        {/* Numbered Page Buttons with Ellipses */}
        {getPagination().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            className={`px-4 py-2 ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } rounded ${page === '...' ? 'cursor-default' : 'hover:bg-gray-300'}`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksGrid;
