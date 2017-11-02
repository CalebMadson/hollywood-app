import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

class ListActors extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: false
    };
  }

  componentDidMount() {
    api.actors.getAll().then(data => {
      console.log(data);
      if (!data.length && data.length !== 0) {
        console.log("Return value for movies not normal", data);
        data = [];

        this.setState(state => {
          return { error: "Unable to fetch movies, we arent sorry" };
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
        <h1>ListActors</h1>
        <Button
          onClick={() => this.props.history.push("/movies")}
          content={"GoTo Movies"}
        />
        <Button
          onClick={() => this.props.history.push("/actors/new")}
          content={"Create Actor"}
        />
        <hr />
        {this.state.error && <div>{this.state.error}</div>}
        <div>
          {this.state.data.map(item => (
            <div key={item.id} style={{ padding: 1 }}>
              <Icon name="pointing right" />
              <Link to={`/actors/${item.id}`}>{item.name}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListActors;
