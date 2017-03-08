import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from 'actions/exampleActions';
import ImmutablePropTypes from 'react-immutable-proptypes';

function mapStateToProps(state) {
  return ({ items: state.example.get('items') });
}

@connect(mapStateToProps)
class Example extends Component {
  static defaultProps = {};
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: ImmutablePropTypes.list.isRequired,
  };

  // List all actions to execute before ending server rendering
  static need = [itemsFetchData];

  componentDidMount() {
    if (this.props.items.count() === 0) {
      Example.need.map(need => this.props.dispatch(need()));
    }
  }

  render() {
    return (
      <ul>
        {this.props.items.valueSeq().map(item => (
          <li key={item.get('id')}>{item.get('name')}</li>
        ))}
      </ul>
    );
  }
}

export default Example;
