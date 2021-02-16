import React, { Component } from 'react';

import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
export default class PeoplePage extends Component {

  state = {
    selectedItem: 1
  }

  onItemSelected = (selectedItem) => {
    this.setState({selectedItem});
  };

  render() {

    const { selectedItem } = this.state;

    const itemList = (
      <ErrorBoundry>
        <PersonList onItemSelected={ this.onItemSelected } />
      </ErrorBoundry>
    );

    const itemDetails = (
      <ErrorBoundry>
        <PersonDetails itemId={selectedItem} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails} />
    )
  }
};