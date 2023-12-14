import "./Home.css";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home(props) {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    newMovieTitle: "",
    newMovieReleaseYear: 0,
    hasNewMovieWonOscar: false,
    updatedMovieTitle: "",
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setMovieData((prevMovieData) => ({
      ...prevMovieData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function submitNewMovie() {
    try {
      await addDoc(collection(db, "movies"), {
        title: movieData.newMovieTitle,
        releaseYear: movieData.newMovieReleaseYear,
        wonOscar: movieData.hasNewMovieWonOscar,
        userId: auth?.currentUser?.uid,
      });
      props.getMovies();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function signout() {
    signOut(auth)
      .then(() => {
        console.log("Sign out success");
        navigate("/");
        // setUser("Guest");
        // setEmail("");
        // setPassword("");
      })
      .catch((error) => console.log(error));
  }

  async function deleteMovie(id) {
    await deleteDoc(doc(db, "movies", id));
    props.getMovies();
  }

  async function updateMovieTitle(id) {
    const movieDoc = doc(db, "movies", id);

    await updateDoc(movieDoc, {
      title: movieData.updatedMovieTitle,
    });
    props.getMovies();
  }

  const moviesEl = props.movies.map((movie) => {
    return (
      <div className="movies-list" key={movie.id}>
        <h1 style={{ color: movie.wonOscar ? "green" : "red" }}>
          {movie.title}
        </h1>
        <p>Released in: {movie.releaseYear}</p>
        <div className="edit-movie-title-container">
          <input
            type="text"
            placeholder="update title"
            onChange={handleChange}
            name="updatedMovieTitle"
            value={movieData.updatedMovieTitle}
          />
          <button onClick={() => updateMovieTitle(movie.id)}>
            Update movie title
          </button>
        </div>
        <button onClick={() => deleteMovie(movie.id)}>delete</button>
      </div>
    );
  });
  return (
    <div className="movies-container">
      <h1 style={{ color: "white" }}>
        Current User: {auth?.currentUser?.email}
      </h1>
      <button onClick={signout} className="signoutBtn">
        Sign-out
      </button>
      <div className="movies-input-container">
        <input
          name="newMovieTitle"
          value={movieData.newMovieTitle}
          type="text"
          placeholder="movie title"
          className="input"
          onChange={handleChange}
        />
        <input
          name="newMovieReleaseYear"
          value={movieData.newMovieReleaseYear}
          type="number"
          placeholder="release year"
          className="input"
          onChange={handleChange}
        />
        <div className="checkbox-input">
          <input
            name="hasNewMovieWonOscar"
            checked={movieData.hasNewMovieWonOscar}
            type="checkbox"
            id="won-oscar"
            onChange={handleChange}
          />
          <label htmlFor="won-oscar">has won oscar?</label>
        </div>
        <button onClick={submitNewMovie}>Submit</button>
      </div>
      {moviesEl}
    </div>
  );
}
