import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      error: false
    };
  }

  componentDidMount() {
    api.movies.getById(this.props.match.params.movieId).then(data => {
      if (!data.id) {
        console.log("this is not the movie you are looking for", data);

        data = {};

        this.setState(state => {
          return {
            error: "Unable to fetch movie"
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
        <h1>MovieDetails</h1>
        <Button
          onClick={() => {
            this.props.history.push("/movies");
          }}
          content={"GoTo Movies"}
        />
        {this.state.error && <div>{this.state.error}</div>}
        {!this.state.error && (
          <div key={this.state.data.id} style={{ padding: 1 }}>
            <Button
              onClick={() => {
                this.props.history.push(`/movies/${this.state.data.id}/edit`);
              }}
              content={"Edit"}
            />
            <hr />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.data.title}
              <img
                width={100}
                height={100}
                src={this.state.data.poster}
                alt={"Movie Poster"}
              />
            </div>
            <div>{this.state.data.stars}</div>
            <div>
              {this.state.data.rating} - {this.state.data.rottenTomatoes}
            </div>
            <div>{this.state.data.summary}</div>
          </div>
        )}
        <hr />
        {this.state.data.actors &&
          this.state.data.actors.map(actor => (
            <div>
              <Icon name="pointing right" />
              <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
            </div>
          ))}
      </div>
    );
  }
}

export default MovieDetails;
