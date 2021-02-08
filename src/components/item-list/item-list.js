import React, { Component } from 'react';

import SwapiService from '../../services';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService();

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

  onListLoaded = (peopleList) => {
    this.setState({ 
      peopleList,
      error: false,
      loading: false
    })
  }

  componentDidMount() {
    this.swapiService
      .getAllPeople()
      .then(this.onListLoaded)
      .catch(this.onError);
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onPersonSelected(id)}>
          {name}
        </li>
      )
    })
  }

  render() {

    const { peopleList, error, loading } = this.state;
    let content;

    if (peopleList) {
      content = this.renderItems(peopleList);
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