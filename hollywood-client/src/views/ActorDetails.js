import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

class ActorDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      error: false
    };
  }
  //setting state as normal

  //collecting actors by an id and checking to see if there is data there and if not display an error message
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
        return { data: data };
      });
    });
  }

  render() {
    return (
      <div>
        <h1>ActorDetails</h1>
        <Button
          onClick={() => {
            this.props.history.push("/actors");
          }}
          content={"GoTo Actors"}
        />
        {this.state.error && <div>{this.state.error}</div>}
        {!this.state.error && (
          <div key={this.state.data.id}>
            <Button
              onClick={() => {
                this.props.history.push(`/actors/${this.state.data.id}/edit`);
              }}
              content={"Edit"}
            />
            <hr />
            <h3>{this.state.data.name}</h3>
            <div>{this.state.data.gender}</div>
            <div>{this.state.data.age}</div>
            <div>{this.state.data.birthday}</div>
            <hr />
            {this.state.data.movies &&
              this.state.data.movies.map(item => (
                <div key={item.id}>
                  <Icon name="pointing right" />
                  <Link to={`/movies/${item.id}`}>{item.title}</Link>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default ActorDetails;
