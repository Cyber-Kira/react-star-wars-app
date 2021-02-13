import { ItemDetails } from '../item-details';
import { withDetails } from '../hoc-helpers/';
import SwapiService from '../../services';

const swapiService = new SwapiService();

const { 
  getPerson,
  getPlanet,
  getStarship,
  getPersonImage,
  getPlanetImage,
  getStarshipImage
} = swapiService;

const PersonDetails = withDetails(ItemDetails, getPerson, getPersonImage);

const PlanetDetails = withDetails(ItemDetails, getPlanet, getPlanetImage);

const StarshipDetails = withDetails(ItemDetails, getStarship, getStarshipImage);

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
}