import BooksGrid from "./components/Books/BooksGrid"
import Layout from "./components/Layout"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WishlistPage from "./components/WishlistPage";
import HomePage from "./components/HomePage";
import BookDetailsPage from "./components/BookDetailsPage";
function App() {
  return (
   <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/wishlist" element={<WishlistPage />} /> 
          <Route path="/book-details" element={<BookDetailsPage />} /> 
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
