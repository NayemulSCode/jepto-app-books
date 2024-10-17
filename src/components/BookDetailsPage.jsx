import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BookDetailsPage = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const book = location.state.bookObj;
  console.log(book)
   const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
  
  return (
    <div className="min-h-screen bg-gray-400   px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gray-400 shadow-lg rounded-lg overflow-hidden">
        <div className="lg:flex">
          {/* Book Cover Section */}
          <div className="lg:w-1/3 relative md:py-10 py-3 md:px-6 px-2 flex justify-center flex-col overflow-hidden">
            <img 
              src={book.formats["image/jpeg"]} 
              alt={book.title} 
              className="object-cover w-full   rounded-lg   lg:rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Book Info Section */}
          <div className="lg:w-2/3 md:p-8 p-2">
          <div className='flex justify-between items-center'>

            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1> 
         
         
            </div>
            <p className="mt-2 text-lg text-gray-600">
              By: {book.authors[0].name} ({book.authors[0].birth_year} - {book.authors[0].death_year})
            </p>
<div className='flex justify-between w-full'>

            {/* Book Details */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-700">Subjects:</h2>
              <ul className="list-disc pl-5 text-gray-600 mt-2">
                {book.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-700">Bookshelves:</h2>
              <ul className="list-disc pl-5 text-gray-600 mt-2">
                {book.bookshelves.map((shelf, index) => (
                  <li key={index}>{shelf}</li>
                ))}
              </ul>
            </div>
</div>

            {/* Download Formats */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700">Available Formats:</h2>
              <ul className="list-disc pl-5 text-blue-500 mt-2">
                {Object.keys(book.formats).map((format, index) => (
                  <li key={index}>
                    <a href={book.formats[format]} target="_blank" rel="noopener noreferrer">
                      {format.replace(/application\/|text\/plain;/g, "").toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download Count */}
            <p className="mt-6 text-gray-600">
              <span className="font-semibold">Download Count:</span> {book.download_count}
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default BookDetailsPage