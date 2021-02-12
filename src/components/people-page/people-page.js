import React, { Component } from 'react';

import './people-page.css';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import { Record, ItemDetails } from '../item-details';
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

    const {getPerson, getPersonImage} = this.swapiService;

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails 
          getData={getPerson} 
          itemId={this.state.selectedPerson} 
          getImageUrl={getPersonImage}>
        
          <Record field="gender" label="Gender" />
          <Record field="eyeColor" label="Eye Color" />
        
        </ItemDetails>
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails} />
    )
  }
};