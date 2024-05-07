import "./home.css";
import { Header } from "../component/Header";
import { Container } from "react-bootstrap";
import { Movies } from "./Movies";
import { data, btns } from "./data";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Favorite = () => {
  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem("movie")) || []
  );
 
  const buttonHandler = (match) => {
    let filbtn = movie.filter((item) => {
      return item.cat.includes(match);
    });
    setMovie(filbtn);
  };

  const HomeHandler = () => {
    setMovie(JSON.parse(localStorage.getItem("movie")) || []);
  };

  const SearchFilter = (e) => {
    let all = [...movie];
    let filsearch = all.filter((item) => {
      return item.name.toLocaleLowerCase().includes(e.toLocaleLowerCase());
    });
    if (filsearch.length === 0 || "") {
      alert("record not found");
    }
    setMovie(filsearch);
  };

  const RemoveMovieHandler = (id) => {
    let del = movie.filter((item) => item.id != id);
    setMovie(del);
    localStorage.setItem("movie", JSON.stringify(del));
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
                className="active btn btn-dark px-3 mx-3 my-2"
              >
                Home
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
              {movie.map((movie, index) => {
                return (
                  <Card
                    key={movie.id}
                    style={{ width: "18rem" }}
                    className="mx-2 my-4"
                  >
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
                          onClick={(e) => RemoveMovieHandler(movie.id)}
                        >
                          {" "}
                          Remove{" "}
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
