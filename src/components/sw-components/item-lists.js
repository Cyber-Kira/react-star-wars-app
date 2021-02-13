import React from 'react';
import ItemList from '../item-list';
import { withData } from '../hoc-helpers';
import SwapiService from '../../services';

const swapiService = new SwapiService();

const {
  getAllPeople,
  getAllPlanets,
  getAllStarships
} = swapiService;

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    );
  };
};

const renderName = (({name, birthYear}) => (
  `${name} (${birthYear})`
));
const renderModelAndName = (({name, model}) => (
  `${name} (${model})`
));

const PersonList = withData(
                          withChildFunction(ItemList, renderName),
                          getAllPeople);

const PlanetList = withData(
                          withChildFunction(ItemList, renderName),
                          getAllPlanets);

const StarshipList = withData(
                          withChildFunction(ItemList, renderModelAndName),
                           getAllStarships);

export {
  PersonList,
  PlanetList,
  StarshipList
}