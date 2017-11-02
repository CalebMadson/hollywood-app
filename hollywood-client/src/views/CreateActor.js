import React, { Component } from "react";
import api from "../api";
import { Form, Input, Dropdown, Button } from "semantic-ui-react";

let gender = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" }
];

class CreateActor extends Component {
  constructor() {
    super();
    this.state = {
      actor: {
        gender: "male"
      }
    };
  }
  //setting states

  //changing state when you input a value into the form
  onInputChange = event => {
    event.persist();

    this.setState(state => {
      return {
        actor: {
          ...state.actor,
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
          ...state.actor,
          [data.name]: data.value
        }
      };
    });
  };

  //on form submition create a actor request then go to /actors
  onFormSubmit = event => {
    event.preventDefault();

    api.actors.create(this.state.actor).then(() => {
      this.props.history.push("/actors");
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
        <h1>CreateActor</h1>
        <Button
          onClick={() => this.props.history.push("/actors")}
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
            name={"name"}
            placeholder={"name"}
            onChange={this.onInputChange}
            required
          />
          <Input
            type="number"
            min={0}
            name={"age"}
            placeholder={"age"}
            onChange={this.onInputChange}
            required
          />
          <Input
            type="text"
            name={"birthday"}
            placeholder={"birthday"}
            onChange={this.onInputChange}
            required
          />
          <Dropdown
            name={"gender"}
            onChange={this.onSelectInputChange}
            defaultValue={this.state.actor.gender}
            placeholder={"Gender"}
            fluid
            selection
            options={gender}
          />
          <Input type="submit" />
        </Form>
      </div>
    );
  }
}

export default CreateActor;
