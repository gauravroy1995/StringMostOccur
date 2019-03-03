import React, { Component } from "react";

import "./App.css";

import Table from "./Table.js";

class App extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: []
  };

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.json();

    //let bodyString = JSON.parse(body);

    this.setState({ responseToPost: body });
  };
  render() {
    console.log(this.state.responseToPost);
    return (
      <div className="App">
        <h2>Please enter the num of max occuring words you want to fetch</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Ask the server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name of word</th>
              <th>Occurences</th>
            </tr>
          </thead>
          <tbody>
            <Table wordsarr={this.state.responseToPost} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
