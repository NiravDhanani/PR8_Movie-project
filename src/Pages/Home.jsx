import "./home.css";
import { Header } from "../component/Header";
import { Container } from "react-bootstrap";
import { Movies } from "./Movies";
import { data, btns } from "./data";
import { useState } from "react";

export const Home = () => {

  const [movie, setMovie] = useState(data);


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
    let all = [...movie];
    let filsearch = all.filter((item) => {
      return item.name.toLocaleLowerCase().includes(e.toLocaleLowerCase());
    });
    if (filsearch.length === 0 || "") {
      alert("record not found");
    } 
    setMovie(filsearch);
    console.log(movie);
  };

  return (
    <>
      <div className="d-flex">
        <div className="col-lg-2 col-md-3 side-nav">
          <Header  />
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
            {movie.length == 0 && <p>No records found</p>}
            <Movies data={movie} />
          </Container>
        </div>
      </div>
    </>
  );
};
