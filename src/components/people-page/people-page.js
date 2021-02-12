import React, { Component } from 'react';

import './people-page.css';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  render() {
    
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
          <ErrorBoundry>
            <ItemList 
              onPersonSelected={ this.onPersonSelected }
              getData={ this.swapiService.getAllPeople }>
              
              {(i) => (
                `${i.name} (${i.birthYear})`
              )}

            </ItemList>
          </ErrorBoundry>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={ this.state.selectedPerson }/>
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails} />
    )
  }
};