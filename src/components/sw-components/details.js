import { ItemDetails } from '../item-details';
import { withDetails } from '../hoc-helpers/';
import SwapiService from '../../services';
import {Record} from '../item-details';

const swapiService = new SwapiService();

const { 
  getPerson,
  getPlanet,
  getStarship,
  getPersonImage,
  getPlanetImage,
  getStarshipImage
} = swapiService;

const personRecord = [
  <Record field="gender" label="Gender"/>,
  <Record field="eyeColor" label="Eye color"/>
];

const PlanetRecord = [
  <Record field="population" label="Rotation Period"/>,
  <Record field="diameter" label="Diameter"/>
];

const StarshipRecord = [
  <Record field="model" label="Model"/>,
  <Record field="costInCredits" label="Cost"/>
];

const PersonDetails = withDetails(ItemDetails, personRecord, getPerson, getPersonImage);

const PlanetDetails = withDetails(ItemDetails, PlanetRecord, getPlanet, getPlanetImage);

const StarshipDetails = withDetails(ItemDetails, StarshipRecord, getStarship, getStarshipImage);

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
}