import "./App.css";
import Auth from "./components/Auth";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

export default function App() {
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    // get n set movies
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovies(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route
            path="home"
            element={<Home movies={movies} getMovies={getMovies} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
