import React, { Component } from 'react';

import './people-page.css';
import { PersonList, PersonDetails } from '../sw-components';
import ErrorIndicator from '../error-indicator/error-indicator';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
export default class PeoplePage extends Component {

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
        <PersonList onItemSelected={ this.onPersonSelected } />
      </ErrorBoundry>
    );

    const itemDetails = (
      <ErrorBoundry>
        <PersonDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails} />
    )
  }
};