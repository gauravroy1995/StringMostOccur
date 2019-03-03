import React, { Component } from "react";

const Table = props => {
  //console.log(props.wordsarr);
  let tablereturned = null;

  if (props) {
    tablereturned = props.wordsarr.map(words => {
      return (
        <tr key={words.name}>
          <td>{words.name}</td>
          <td>{words.total}</td>
        </tr>
      );
    });
  }

  return tablereturned;
};

export default Table;
