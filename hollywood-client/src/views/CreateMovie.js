import React, { Component } from "react";
import api from "../api";

class CreateMovie extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      movie: {}
    };
  }

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

    api.movies.create(this.state.movie).then(() => {
      this.props.history.push("/movies");
    });
  };

  render() {
    return (
      <div>
        <h1>CreateMovie</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"title"}
            placeholder={"title"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"rating"}
            placeholder={"rating"}
            onChange={this.onInputChange}
          />
          <input
            type="number"
            min={0}
            max={100}
            name={"rottenTomatoes"}
            placeholder={"rottenTomatoes"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"summary"}
            placeholder={"summary"}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name={"poster"}
            placeholder={"Img Link"}
            onChange={this.onInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateMovie;
