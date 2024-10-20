import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const BookDetailsPage = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const book = location.state.bookObj;
  console.log(book)
   const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-gray-400 py-6  px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white py-4 shadow-lg rounded-lg overflow-hidden">
      <button className={`flex min-w-[80px] items-center justify-center gap-1 rounded-md transition-all ml-5 py-1.5 lg:py-2 bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]`}
       onClick={handleBackClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 19L8 12L15 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        Back</button>
        <div className="lg:flex">
          {/* Book Cover Section */}
          <div className="lg:w-1/3 relative md:py-10 py-3 md:px-6 px-2 flex justify-center items-center  overflow-hidden">
            <img 
              src={book.formats["image/jpeg"]} 
              alt={book.title} 
              className="object-cover w-[65%] shadow-2xl  rounded-lg   lg:rounded-lg transition-transform duration-500 hover:scale-105"
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
          <div className='flex justify-between items-start lg:flex-row flex-col w-full gap-4'>

            {/* Book Details */}
            <div className="mt-6 flex-1 ">
              <h2 className="text-xl font-semibold text-gray-700">Subjects:</h2>
              <ul className="list-disc pl-5 text-gray-600 mt-2">
                {book.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex-1 ">
              <h2 className="text-xl font-semibold text-gray-700">Bookshelves:</h2>
              <ul className="list-disc pl-5 text-gray-600 mt-2">
                {book.bookshelves.map((shelf, index) => (
                  <li key={index}>{shelf}</li>
                ))}
              </ul>
            </div>
            {/* Download Formats */}
            <div className="mt-6 flex-1 ">
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