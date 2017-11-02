import React, { Component } from "react";
import api from "../api";
import { Form, Input, Dropdown, Button } from "semantic-ui-react";

let gender = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" }
];

class EditActor extends Component {
  constructor() {
    super();
    this.state = {
      actor: {
        gender: "male"
      }
    };
  }
  //setting state

  //changing state when you input something into the form
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

  //on form submition update a actor then go to actor details
  onFormSubmit = event => {
    event.preventDefault();

    api.actors
      .update(this.props.match.params.actorId, this.state.actor)
      .then(() => {
        this.props.history.push(`/actors/${this.props.match.params.actorId}`);
      });
  };

  componentDidMount() {
    api.actors.getById(this.props.match.params.actorId).then(data => {
      if (!data.id) {
        console.log("this is not the actor you are looking for", data);

        data = {};

        this.setState(state => {
          return {
            error: "Unable to fetch actor"
          };
        });
      }

      this.setState(state => {
        return { actor: data };
      });
    });
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
        <h1>EditActor</h1>
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
            value={this.state.actor.name}
            onChange={this.onInputChange}
            required
          />
          <Input
            type="number"
            min={0}
            name={"age"}
            placeholder={"age"}
            value={this.state.actor.age}
            onChange={this.onInputChange}
            required
          />
          <Input
            type="text"
            name={"birthday"}
            placeholder={"birthday"}
            value={this.state.actor.birthday}
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

export default EditActor;
