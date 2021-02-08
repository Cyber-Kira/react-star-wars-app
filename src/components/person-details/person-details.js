import React, { Component } from 'react';

import SwapiService from '../../services';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
    error: false
  }

  onPersonLoaded = (person) => {
    this.setState({ 
      person,
      loading: false
     });
  };

  onError = (error) => {
    this.setState({ 
      error: true,
      loading: false
    });
  };

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    };
  }
  
  render() {
    const { person, loading, error } = this.state;

    if (!person) {
      return (
        <div className="person-details card">
          <span className="not-selected">Please select a person from the list</span>
        </div>
      )
    }

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={person} /> : null;

    return (
      <div className="person-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  };
};

const PersonView = ({ person }) => {

  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <>
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt={name} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
    </>
  )
};