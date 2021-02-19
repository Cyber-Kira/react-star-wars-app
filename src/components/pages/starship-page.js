import React from 'react';

import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom';
import ErrorBoundry from '../error-boundry';

const StarshipPage = ({ history }) => {
  return (
    <ErrorBoundry>
      <StarshipList onItemSelected={ (itemId) => {
        history.push(`/starships/${itemId}`);
      } } />
    </ErrorBoundry>
  )
};

export default withRouter(StarshipPage);