import React, { useEffect, useState } from 'react';
import BooksGridItem from './Books/BooksGridItem';

const WishlistPage = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  if (wishlistBooks.length === 0) {
    return <div>Your wishlist is empty.</div>;
  }
  return (
    <div className="container mx-auto grid grid-cols-1 max-w-7xl gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {wishlistBooks.map((book) => (
        <BooksGridItem
            key={book.id}
            id={book.id}
            name={book.title}
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
