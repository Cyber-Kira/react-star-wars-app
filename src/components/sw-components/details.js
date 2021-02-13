import ItemDetails from '../item-details';
import SwapiService from '../../services';
import {Record} from '../item-details/item-details';
import { SwapiServiceConsumer } from '../swapi-service-context';

const swapiService = new SwapiService();

const { 
  getPerson,
  getPlanet,
  getStarship,
  getPersonImage,
  getPlanetImage,
  getStarshipImage
} = swapiService;

const PersonDetails = ({itemId}) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={getPerson}
      getImageUrl={getPersonImage}>

      <Record field="gender" label="Gender"/>
      <Record field="eyeColor" label="Eye color"/>
    </ItemDetails>
  )
}

const planetRecord = [
  <Record field="population" label="Rotation Period" key={1}/>,
  <Record field="diameter" label="Diameter" key={2}/>
];

const starshipRecord = [
  <Record field="model" label="Model" key={1}/>,
  <Record field="costInCredits" label="Cost" key={2}/>
];

export {
  PersonDetails
  // PlanetDetails,
  // StarshipDetails
}