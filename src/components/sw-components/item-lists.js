import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';


const withChildFunction = (Wrapped, fn) => {
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

const PersonList = withSwapiService(
                        withData(
                          withChildFunction(ItemList, renderNameAndBirthDate)), mapPersonMethodsToProps);

const PlanetList = withSwapiService(
                        withData(
                          withChildFunction(ItemList, renderName)), mapPlanetMethodsToProps);

const StarshipList = withSwapiService(
                        withData(
                          withChildFunction(ItemList, renderModelAndName)), mapStarshipMethodsToProps);

export {
  PersonList,
  PlanetList,
  StarshipList
}