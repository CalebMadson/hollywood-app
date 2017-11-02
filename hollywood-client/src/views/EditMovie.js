import React, { Component } from "react";
import api from "../api";
import { Form, Input, Dropdown, Button } from "semantic-ui-react";

let ratings = [
  { text: "G", value: "G" },
  { text: "PG", value: "PG" },
  { text: "PG-13", value: "PG-13" },
  { text: "R", value: "R" },
  { text: "NR", value: "NR" }
];

class EditMovie extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      actors: [],
      movie: {
        rating: "NR"
      }
    };
  }

  addCast = actorId => {
    api.movies
      .addActor(this.props.match.params.movieId, { id: actorId })
      .then(() => {
        this.fetchMovieAndActors();
      });
  };

  removeCast = actorId => {
    api.movies
      .removeActor(this.props.match.params.movieId, { id: actorId })
      .then(() => {
        this.fetchMovieAndActors();
      });
  };

  onInputChange = event => {
    event.persist();

    this.setState(state => {
      return {
        movie: {
          ...state.movie,
          [event.target.name]: event.target.value
        }
      };
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    api.movies
      .update(this.props.match.params.movieId, this.state.movie)
      .then(() => {
        this.props.history.push(`/movies/${this.props.match.params.movieId}`);
      });
  };

  fetchMovieAndActors = () => {
    api.movies.getById(this.props.match.params.movieId).then(data => {
      if (!data.id) {
        console.log("this is not the movie you are looking for", data);

        data = {};

        this.setState(state => {
          return {
            error: "Unable to fetch actor"
          };
        });
      }

      this.setState(state => {
        return { movie: data };
      });
    });

    api.actors.getAll().then(actors => {
      if (!actors.length && actors.length !== 0) {
        return;
      }

      this.setState(state => {
        return {
          actors: actors
        };
      });
    });
  };

  componentDidMount() {
    this.fetchMovieAndActors();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1>EditMovie</h1>
        <Button
          onClick={() => this.props.history.push("/movies")}
          content={"Return"}
        />
        <hr />
        <Form
          onSubmit={this.onFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Input
            type="text"
            name={"title"}
            placeholder={"title"}
            onChange={this.onInputChange}
            value={this.state.movie.title}
            required
          />
          <Dropdown
            name="rating"
            onChange={this.onInputChange}
            defaultValue={this.state.movie.rating}
            required
            placeholder={"Rating"}
            fluid
            selection
            options={ratings}
          />
          <Input
            type="number"
            min={0}
            max={100}
            name={"rottenTomatoes"}
            placeholder={"rottenTomatoes"}
            onChange={this.onInputChange}
            value={this.state.movie.rottenTomatoes}
            required
          />
          <Input
            type="text"
            name={"summary"}
            placeholder={"summary"}
            onChange={this.onInputChange}
            value={this.state.movie.summary}
            required
          />
          <Input
            type="text"
            name={"poster"}
            placeholder={"Img Link"}
            onChange={this.onInputChange}
            value={this.state.movie.poster}
          />
          <Input type="submit" />
        </Form>
        <hr />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {this.state.movie.actors &&
              this.state.movie.actors.map(item => (
                <div>
                  {item.name}
                  <button onClick={() => this.removeCast(item.id)}>X</button>
                </div>
              ))}
          </div>
          <div style={{ flex: 1 }}>
            {this.state.actors &&
              this.state.actors.map(item => (
                <div>
                  {item.name}
                  <button onClick={() => this.addCast(item.id)}>cast</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default EditMovie;
