import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

class ListMovies extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: false
    };
  }

  componentDidMount() {
    api.movies.getAll().then(data => {
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
    console.log(this.state);
    return (
      <div>
        <h1>ListMovies</h1>
        <Button
          onClick={() => this.props.history.push("/actors")}
          content={"GoTo Actors"}
        />
        <Button
          onClick={() => this.props.history.push("/movies/new")}
          content={"Create Movie"}
        />
        <hr />
        {this.state.error && <div>{this.state.error}</div>}
        <div>
          {this.state.data.map(item => (
            <div key={item.id} style={{ padding: 1 }}>
              <Icon name="pointing right" />
              <Link to={`/movies/${item.id}`}>{item.title}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListMovies;
