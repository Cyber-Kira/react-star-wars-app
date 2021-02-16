import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import { SwapiService, DummySwapiService } from '../../services';
import PeoplePage from '../people-page';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  swapiService = new DummySwapiService();

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

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;

    return (
      <SwapiServiceProvider value={this.swapiService}>
        <div className="stardb-app">
          <Header />
          <button
            className="toggle-planet btn btn-warning btn-lg col-sm col-lg-3"
            onClick={ this.toggleRandomPlanet }>
            Toggle Random Planet
          </button>

          { planet }

          <PeoplePage />
        </div>
      </SwapiServiceProvider>
    );
  }
}
