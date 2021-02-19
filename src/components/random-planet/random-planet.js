import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

const PlanetView = ({ planet }) => {

  const { name, population, rotationPeriod, diameter, id } = planet;

  return (
    <>
        <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet"/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </>
  )
};

const RandomPlanet = (props) => {

  const swapiService = new SwapiService();

  const [planet, setPlanet] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { updateInterval } = props;
    let cancelled = false;

    updatePlanet();
    const interval = setInterval(!cancelled && updatePlanet, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    }
  }, []);

  const onPlanetLoaded = (planet) => {
    console.log(planet)
    setPlanet(planet);
    setLoading(false);
  };

  const onError = (error) => {
    setError(true);
    setLoading(false);
  };

  const updatePlanet = () => {
    const id = Math.floor(Math.random() * 25 + 2);
    swapiService
      .getPlanet(id)
        .then(onPlanetLoaded)
        .catch(onError);
  };

  const hasData = !(loading || error);

  const errorMessage = error ? <ErrorIndicator /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = hasData ? <PlanetView planet={planet} /> : null;

  return (
    <div className="random-planet jumbotron rounded">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default RandomPlanet;