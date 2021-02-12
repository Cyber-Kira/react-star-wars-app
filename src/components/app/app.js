import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services';

import './app.css';
import PeoplePage from '../people-page';
import ItemDetails from '../item-details';
import Row from '../row';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPerson: null,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    // const planet = this.state.showRandomPlanet ?
      // <RandomPlanet /> :
      // null;

      const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

    const personDetails = (
      <ItemDetails getData={getPerson} itemId={11} getImageUrl={getPersonImage} />
    )

    const starshipDetails = (
      <ItemDetails getData={getStarship} itemId={5} getImageUrl={getStarshipImage} />
    )

    return (
      <div className="stardb-app">
        <Header />
{/* 
        <button
          className="toggle-planet btn btn-warning btn-lg col-sm col-lg-3"
          onClick={ this.toggleRandomPlanet }>
          Toggle Random Planet
        </button>

        { planet }

        <PeoplePage /> */}
        <Row
          left={personDetails}
          right={starshipDetails} />
      </div>
    );
  }
}
