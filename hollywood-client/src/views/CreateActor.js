import React, { Component } from "react";
import api from "../api";

class CreateActor extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  onInputChange = event => {
    event.persist();
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>CreateActor</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            name={"name"}
            placeholder={"name"}
            onChange={this.onInputChange}
          />
          <input
            type="number"
            min={0}
            name={"age"}
            placeholder={"age"}
            onChange={this.onInputChange}
          />
          />
          <input
            type="text"
            name={"gender"}
            placeholder={"gender"}
            onChange={this.onInputChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateActor;
