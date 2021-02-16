import React, { Component } from 'react';

import { StarshipList, StarshipDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class StarshipPage extends Component {

  state = {
    selectedItem: 5
  }

  onItemSelected = (selectedItem) => {
    this.setState({selectedItem});
  };

  render() {

    const { selectedItem } = this.state;

    const itemList = (
      <ErrorBoundry>
        <StarshipList onItemSelected={ this.onItemSelected } />
      </ErrorBoundry>
    );

    const itemDetails = (
      <ErrorBoundry>
        <StarshipDetails itemId={selectedItem} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails} />
    )
  }
};