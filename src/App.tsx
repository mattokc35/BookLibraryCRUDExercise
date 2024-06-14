import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useStore from "./store";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const { fetchBooks, fetchGenres } = useStore();

  //fetch books and genres when app renders
  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
