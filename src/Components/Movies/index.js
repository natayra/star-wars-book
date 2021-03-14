import React from "react";
import Starships from "../Starships";
import "./index.css";

export default class Movies extends React.Component {
  state = {
    movies: [],
    description: { 0: " " },
    starships: [],
  };

  componentDidMount() {
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((moviesList) => {
        for (let i = 0; i < moviesList.results.length; i++) {
          const newMovie = moviesList.results[i];
          let movies = [...this.state.movies, newMovie];
          this.setState({
            movies: movies,
          });
        }
      })
      .catch((err) => alert(err));
  }

  showDetails = (movie) => {
    let b = {};
    b[movie.episode_id] = movie.opening_crawl;
    this.setState({
      description: b,
    });
  };

  showStarships = (movie) => {
    this.setState({
      starships: [],
    });
    movie.starships.map((starship) => {
      fetch(starship)
        .then((res) => res.json())
        .then((starshipData) => {
          const newStarship = starshipData;
          const starships = [...this.state.starships, newStarship];
          this.setState({
            starships: starships,
          });
        })
        .catch((err) => alert(err));
    });
  };

  render() {
    return (
      <div className="Movies">
        <div className="movie-title-container">
          {this.state.movies.map((movie) => (
            <>
              <button
                className="movie-title"
                onClick={() => {
                  this.showDetails(movie);
                }}
              >
                {movie.title}
              </button>
              {Number(Object.keys(this.state.description)) ===
              movie.episode_id ? (
                <div>
                  <div className="movie-description">
                    {Object.values(this.state.description)}
                  </div>
                  <button
                  className="starship-button"
                    onClick={() => {
                      this.showStarships(movie);
                    }}
                  >
                    Starships
                  </button>
                </div>
              ) : null}
            </>
          ))}
        </div>
        <div className="starship-name-container">
          <Starships starships={this.state.starships} />
        </div>
      </div>
    );
  }
}
