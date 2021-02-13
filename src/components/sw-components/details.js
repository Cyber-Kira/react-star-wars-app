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

const withChildFunction = (Wrapped, record) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {record}
      </Wrapped>
    );
  };
};

const personRecord = [
  <Record field="gender" label="Gender" key={1}/>,
  <Record field="eyeColor" label="Eye color" key={2}/>
];

const planetRecord = [
  <Record field="population" label="Rotation Period" key={1}/>,
  <Record field="diameter" label="Diameter" key={2}/>
];

const starshipRecord = [
  <Record field="model" label="Model" key={1}/>,
  <Record field="costInCredits" label="Cost" key={2}/>
];

const PersonDetails = withDetails(
                                  withChildFunction(ItemDetails, personRecord),
                                  getPerson,
                                  getPersonImage);

const PlanetDetails = withDetails(
                                  withChildFunction(ItemDetails, planetRecord),
                                  getPlanet,
                                  getPlanetImage);

const StarshipDetails = withDetails(
                                  withChildFunction(ItemDetails, starshipRecord),
                                  getStarship,
                                  getStarshipImage);

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
}