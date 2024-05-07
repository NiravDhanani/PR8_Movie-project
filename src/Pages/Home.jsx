import "./home.css";
import { Header } from "../component/Header";
import { Container } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { data, btns } from "./data";
import { useEffect, useState } from "react";

export const Home = () => {
  const [movie, setMovie] = useState(data);
  const [favorit, setFavorit] = useState([]);
  const [search, setSearch] = useState("");
  let allrec = search.length > 0 ? search : movie;

  const getRandomMovies = () => {
    let trend = data.filter(item=>item.upcoming === "0")
      const randomData = trend.sort(() => Math.random() - 0.5);
      const randomMovies = randomData.slice(0, 10);
      setMovie(randomMovies);
  };

  const getUpcomingMovie = () => {
    let upMovie = [...data];
    let up = upMovie.filter((item) => item.upcoming === "1");
    setMovie(up);
  };

  const buttonHandler = (match) => {
    let filbtn = data.filter((item) => {
      return item.cat.includes(match);
    });
    setMovie(filbtn);
  };

  const HomeHandler = () => {
    setMovie(data);
  };

  const SearchFilter = (e) => {
    let all = [...data];
    let filsearch = all.filter((item) => {
      return item.name.toLocaleLowerCase().includes(e.toLocaleLowerCase());
    });
    if (filsearch.length === 0 || "") {
      alert("record not found");
    }
    setSearch(filsearch);
  };

  // Load existing favorite movies from local storage on component mount
  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("movie")) || [];
    setFavorit(store);
  }, []);

  const AddMovieHandler = (id) => {
    const movieToAdd = movie.find((item) => item.id === id);
    const store = JSON.parse(localStorage.getItem("movie")) || [];
    let uniq = store.some((item) => item.id === id);
    if (uniq) {
      alert("movie already exist");
      return false;
    }
    if (movieToAdd) {
      const updatedFavorites = [...favorit, movieToAdd];
      setFavorit(updatedFavorites);
      localStorage.setItem("movie", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="col-lg-2 col-md-3 side-nav">
          <Header />
        </div>
        <div className="col-lg-10 col-md-9">
          <div className="box">
            <form className="search">
              <input
                type="text"
                placeholder="Search-Movie"
                className="form-control w-75"
                onChange={(e) => SearchFilter(e.target.value)}
              />
            </form>
          </div>
          <Container>
            <div className="p-4 d-flex flex-wrap justify-content-center">
              <button
                onClick={HomeHandler}
                className=" active btn btn-dark px-3 mx-3 my-2"
              >
                Home
              </button>
              <button
                onClick={getRandomMovies}
                className={`btn btn-dark px-3 mx-3 my-2`}
              >
                Trending
              </button>
              <button
                onClick={getUpcomingMovie}
                className={`btn btn-dark px-3 mx-3 my-2 `}
              >
                Upcoming
              </button>
              {btns.map((item) => {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => buttonHandler(item.btn)}
                      className="btn btn-dark px-3 mx-3 my-2"
                    >
                      {" "}
                      {item.btn}{" "}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="d-flex flex-wrap justify-content-center">
              {allrec.map((movie, index) => {
                
                return (
                  <Card
                    key={movie.id}
                    style={{ width: "18rem" }}
                    className="mx-2 my-4"
                  >
                    <span className="upMovies">
                      {movie.upcoming == 1 ? (
                        <p className="m-0 bg-danger py-1 px-3">Upcoming Soon</p>
                      ) : (
                        <p className="m-0 bg-primary py-1 px-3">{movie.qly}</p>
                      )}
                    </span>
                    <Card.Img
                      variant="top"
                      src={movie.img}
                      style={{ height: "400px" }}
                    />
                    <Card.Body style={{ height: "250px" }}>
                      <Card.Title className="text-center">
                        {movie.name}
                      </Card.Title>
                      <Card.Text className="text-center">{movie.des}</Card.Text>
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="primary"
                          style={{ position: "absolute", bottom: "20px" }}
                          onClick={(e) => AddMovieHandler(movie.id)}
                        >
                          {" "}
                          Add Favorites{" "}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
