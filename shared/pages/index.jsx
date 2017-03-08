import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AppView extends Component {
  render() {
    return (
      <div>
        Welcome to my site !!!
        <ul>
          <li><Link to="exampleDumb">Example Component</Link></li>
          <li><Link to="example">Example Container</Link></li>
        </ul>
      </div>
    );
  }
}
