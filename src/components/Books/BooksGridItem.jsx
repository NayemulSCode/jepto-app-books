import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInView } from "react-intersection-observer"

const BooksGridItem = ({ id, name, author, thumbnail, genre, bookObj }) => {
  const [favourite, setFavourite] = useState(false)
  const navigate = useNavigate()
  const { ref, inView } = useInView({ triggerOnce: true }) // Trigger animation once
  useEffect(() => {
    // Check if the item is already in the wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    setFavourite(wishlist.includes(id))
  }, [id])

  const handleFav = (bookId) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    if (favourite) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((itemId) => itemId !== bookId)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setFavourite(false)
    } else {
      // Add to wishlist
      wishlist.push(bookId)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setFavourite(true)
    }
    window.dispatchEvent(new Event("wishlist"))
  }

  const gotoBooksDetails = () => {
    navigate("/book-details", { state: { bookObj } })
  }

  return (
    <div
      ref={ref}
      className={`transition-shadow duration-300 shadow-custom hover:shadow-customHover p-4 rounded-md flex flex-col justify-start items-stretch gap-4 
        ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } transition-opacity transform duration-500 ease-in-out`}
    >
        <div
          onClick={gotoBooksDetails}
          className="h-64 flex items-center justify-center rounded-md border border-[#324251]/30   p-6 overflow-hidden bg-blue-200 group  cursor-pointer"
        >
          <img
            className="max-w-[144px] hover:scale-110 group-hover:scale-110 transition-transform duration-500 ease-in-out"
            src={thumbnail}
            alt={name}
          />
        </div>

        <div className=" flex flex-col flex-grow   cursor-pointer">
          <div
            onClick={gotoBooksDetails}
            className="flex flex-col justify-end  "
          >
            <h4 className="text-lg font-bold lg:text-xl min-h-14 text-blue-700  ">
              {name}
            </h4>
            <div className="flex justify-between items-start ">
              <p className="text-xs lg:text-sm min-h-12">
                By : <span className="font-medium ">{author}</span>
              </p>
              <p className="text-xs lg:text-sm">
                Id : <span>{id}</span>
              </p>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-between gap-6  ">
            <p className="text-xs lg:text-sm text-balance">Genre: {genre}</p>

            <div className="flex items-center gap-3 text-xs lg:text-sm">
              <button
                onClick={() => handleFav(id)}
                className={`flex min-w-[180px] w-full items-center justify-center gap-1 rounded-md transition-all py-1.5 lg:py-2 ${
                  favourite
                    ? "bg-[#DC2954]/[14%] text-[#DC2954] hover:bg-[#DC2954]/[24%]"
                    : "bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]"
                }`}
              >
                {favourite ? (
                  <>
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 21 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.0001 10.572L10.5001 18L3.00006 10.572C2.50536 10.0906 2.1157 9.51202 1.8556 8.87264C1.59551 8.23326 1.47062 7.54695 1.48879 6.85693C1.50697 6.16692 1.66782 5.48814 1.96121 4.86334C2.25461 4.23854 2.67419 3.68126 3.19354 3.22658C3.71289 2.77191 4.32076 2.42969 4.97887 2.22148C5.63697 2.01327 6.33106 1.94359 7.01743 2.0168C7.70379 2.09002 8.36756 2.30456 8.96693 2.64691C9.56631 2.98926 10.0883 3.452 10.5001 4.006C10.9136 3.45602 11.4362 2.99732 12.0352 2.65861C12.6341 2.31989 13.2966 2.10845 13.981 2.03752C14.6654 1.96659 15.3571 2.0377 16.0128 2.24639C16.6685 2.45509 17.2741 2.79687 17.7916 3.25036C18.3091 3.70386 18.7275 4.25929 19.0205 4.88189C19.3135 5.5045 19.4748 6.18088 19.4944 6.86871C19.5139 7.55653 19.3913 8.24099 19.1342 8.87925C18.8771 9.51751 18.491 10.0958 18.0001 10.578"
                        fill="#DC2954"
                      />
                    </svg>{" "}
                    Remove from Wishlist
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>{" "}
                    Add to Wishlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BooksGridItem
