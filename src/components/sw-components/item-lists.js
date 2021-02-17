import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helpers';

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

const PersonList = compose(
                      withSwapiService(mapPersonMethodsToProps),
                      withData,
                      withChildFunction(renderNameAndBirthDate)
                    )(ItemList);

const PlanetList = compose(
                      withSwapiService(mapPlanetMethodsToProps),
                      withData,
                      withChildFunction(renderName)
                    )(ItemList);

const StarshipList = compose(
                      withSwapiService(mapStarshipMethodsToProps),
                      withData,
                      withChildFunction(renderModelAndName)
                    )(ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
}