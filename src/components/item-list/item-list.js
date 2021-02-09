import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  state = { 
    peopleList: null,
    loading: true,
    error: false
  }

  onError = (error) => {
    this.setState({ 
      error: true,
      loading: false
    });
  };

  onListLoaded = (itemList) => {
    this.setState({ 
      itemList,
      error: false,
      loading: false
    })
  }

  componentDidMount() {

    const { getData } = this.props;

    getData()
      .then(this.onListLoaded)
      .catch(this.onError);
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;

      const label = this.props.children(item);

      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onPersonSelected(id)}>
          {label}
        </li>
      )
    })
  }

  render() {

    const { itemList, error, loading } = this.state;
    let content;

    if (itemList) {
      content = this.renderItems(itemList);
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <ul className="item-list list-group">
        {errorMessage}
        {spinner}
        {content}
      </ul>
    );
  };
};