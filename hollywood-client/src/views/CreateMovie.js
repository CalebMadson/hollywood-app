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

class CreateMovie extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      movie: {
        rating: "NR"
      }
    };
  }
  //setting state

  //changing state when you Input something in the form
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

  onSelectInputChange = (event, data) => {
    event.persist();
    this.setState(state => {
      return {
        movie: {
          ...state.movie,
          [data.name]: data.value
        }
      };
    });
  };

  //on form submition create a movie request then go to /movies
  onFormSubmit = () => {
    api.movies.create(this.state.movie).then(() => {
      this.props.history.push("/movies");
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1>CreateMovie</h1>
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
            required
          />
          <Dropdown
            name="rating"
            onChange={this.onSelectInputChange}
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
            required
          />
          <Input
            type="text"
            name={"summary"}
            placeholder={"summary"}
            onChange={this.onInputChange}
            required
          />
          <textarea
            name="stars"
            cols="20"
            rows="2"
            onChange={this.onInputChange}
            placeholder={"Seperate Stars with a comma"}
          />
          <Input
            type="text"
            name={"poster"}
            placeholder={"Img Link"}
            onChange={this.onInputChange}
          />
          <Input type="submit" />
        </Form>
      </div>
    );
  }
}

export default CreateMovie;
