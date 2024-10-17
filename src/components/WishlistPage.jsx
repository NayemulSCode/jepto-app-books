import React, { useEffect, useState } from 'react';
import BooksGridItem from './Books/BooksGridItem';

const WishlistPage = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchWishlistBooks = ()=>{
  // Get the wishlist IDs from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.length > 0) {
      // Convert array of IDs to comma-separated string
      const ids = wishlist.join(',');

      // Fetch books from API based on the wishlist IDs
      fetch(`https://gutendex.com/books?ids=${ids}`)
        .then((response) => response.json())
        .then((data) => {
          setWishlistBooks(data.results); // Assuming 'results' is where the books are stored in the API response
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching wishlist books:', error);
          setLoading(false);
        });


    } else {
      setLoading(false);
    }

}


  useEffect(() => {
  fetchWishlistBooks()


    window.addEventListener('wishlist', fetchWishlistBooks);

    return () =>{
      window.removeEventListener("wishlist", fetchWishlistBooks)
    }

    
  }, []);

   if (loading) {
    return <div className='w-full flex justify-center bg-[#1f6dc7]' ><img className='   bg-[#1f6dc7]' src="/loading-animations-preloader.gif" alt="Loading Books..." /></div>;
  }


  if (wishlistBooks.length === 0) {
    return <div className='w-full flex justify-center bg-[#1f6dc7]' ><img className='   bg-[#1f6dc7]' src="/emptybook.gif" alt="Loading Books..." /></div>;
  }
  return (
    <div className="mt-6 container mx-auto grid grid-cols-1 max-w-7xl  px-4 xl:px-0 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {wishlistBooks.map((book) => (
        <BooksGridItem
            key={book.id}
            id={book.id}
            name={book.title}
             bookObj={book}
            author={book.authors.map((author) => author.name).join(', ')}
            thumbnail={book.formats['image/jpeg']}
            genre={book.subjects ? book.subjects.join(', ') : 'Unknown'}
            favourite={true} // All books in the wishlist are favourites
        />
      ))}
    </div>
  );
};

export default WishlistPage;
