import React, { Component, useCallback } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import { SwapiService, DummySwapiService } from '../../services';
import { SwapiServiceProvider } from '../swapi-service-context';
import {
  PeoplePage,
  PlanetPage,
  StarshipPage
} from '../pages';

import './app.css';

export default class App extends Component {


  state = {
    hasError: false,
    swapiService: new SwapiService()
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <SwapiServiceProvider value={this.state.swapiService}>
        <Router>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>

          <RandomPlanet /> 

          <Route 
            path="/people"
            conponent={PeoplePage} />
          <Route 
            path="/planets"
            conponent={PlanetPage} />
          <Route 
            path="/people"
            conponent={StarshipPage} />
              
          </div>
        </Router>
      </SwapiServiceProvider>
    );
  }
}
