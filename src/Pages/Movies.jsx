import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { data } from "./data";

export const Movies = ({ data, sorry }) => {
  const [favorit, setFavorit] = useState([]);
  const [record, setRecord] = useState(data);

  // Load existing favorite movies from local storage on component mount
  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("movie")) || [];
    setFavorit(store);
  }, []);

  const AddMovieHandler = (id) => {
    const movieToAdd = record.find((item) => item.id === id);
    if (movieToAdd) {
      const updatedFavorites = [...favorit, movieToAdd];
      setFavorit(updatedFavorites);
      localStorage.setItem("movie", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {data.map((movie, index) => {
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
                <Card.Title className="text-center">{movie.name}</Card.Title>
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
    </>
  );
};
