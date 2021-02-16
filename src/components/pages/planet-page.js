import React, { Component } from 'react';

import { PlanetList, PlanetDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class PlanetPage extends Component {

  state = {
    selectedItem: 3
  }

  onItemSelected = (selectedItem) => {
    this.setState({selectedItem});
  };

  render() {

    const { selectedItem } = this.state;

    const itemList = (
      <ErrorBoundry>
        <PlanetList onItemSelected={ this.onItemSelected } />
      </ErrorBoundry>
    );

    const itemDetails = (
      <ErrorBoundry>
        <PlanetDetails itemId={selectedItem} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={itemDetails} />
    )
  }
};