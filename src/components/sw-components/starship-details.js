import ItemDetails from '../item-details';
import {Record} from '../item-details/item-details';
import { SwapiServiceConsumer } from '../swapi-service-context';

const StarshipDetails = ({ itemId }) => {
  return (
    <SwapiServiceConsumer>
      {
        ({ getStarship, getStarshipImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getStarship}
              getImageUrl={getStarshipImage}>
            <Record field="model" label="Model"/>,
            <Record field="costInCredits" label="Cost"/>
            
            </ItemDetails>
          )
        }
      }
    </SwapiServiceConsumer>
  )
}

export default StarshipDetails;