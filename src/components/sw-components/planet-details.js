import ItemDetails from '../item-details';
import {Record} from '../item-details/item-details';
import { SwapiServiceConsumer } from '../swapi-service-context';

const PlanetDetails = ({ itemId }) => {
  return (
    <SwapiServiceConsumer>
      {
        ({ getPlanet, getPlanetImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPlanet}
              getImageUrl={getPlanetImage}>

            <Record field="population" label="Rotation Period"/>,
            <Record field="diameter" label="Diameter"/>
            </ItemDetails>
          )
        }
      }
    </SwapiServiceConsumer>
  )
}

export default PlanetDetails;