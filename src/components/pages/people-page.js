import React from 'react';
import { withRouter } from 'react-router-dom';

import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
const PeoplePage = ({ history, match }) => {

  const {id} = match.params;

  const itemList = (
    <ErrorBoundry>
      <PersonList onItemSelected={ (id) => history.push(id) } />
    </ErrorBoundry>
  );

  const itemDetails = (
    <ErrorBoundry>
      <PersonDetails itemId={id} />
    </ErrorBoundry>
  );

  return (
    <Row left={itemList} right={itemDetails} />
  )
};

export default withRouter(PeoplePage);