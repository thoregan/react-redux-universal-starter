import React, { Component, PropTypes } from 'react';

export default class AppView extends Component {
  static defaultProps = {
    children: null,
  };

  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div id="app-view">
        <h1>App</h1>

        <hr />
        {this.props.children}
      </div>
    );
  }
}
