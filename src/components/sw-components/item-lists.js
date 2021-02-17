import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';


const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    );
  };
};

const renderNameAndBirthDate = (({name, birthYear}) => (
  `${name} (birth: ${birthYear})`
));
const renderName = ({name}) => name;
const renderModelAndName = (({name, model}) => (
  `${name} (model: ${model})`
));

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};

const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};

const PersonList = withSwapiService(mapPersonMethodsToProps)(
                        withData(
                          withChildFunction(renderNameAndBirthDate)
                            (ItemList)));

const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
                        withData(
                          withChildFunction(renderName)
                            (ItemList)));

const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
                        withData(
                          withChildFunction(renderModelAndName)
                            (ItemList)));

export {
  PersonList,
  PlanetList,
  StarshipList
}