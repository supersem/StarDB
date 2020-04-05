import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator'
import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list/item-list';
import ItemDetails, { Record } from '../item-details/item-details';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError:false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const {getPerson,
           getStarship,
           getPersonImage,
           getStarshipImage,
           getAllPeople,
           getAllPlanets} = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={10}
        getData={getPerson}
        getImageUrl={getPersonImage} >

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <PersonDetails itemId={11} />

          <PlanetDetails itemId={5} />

          <StarshipDetails itemId={9} />

          <PersonList />

          <StarshipList />

          <PlanetList />
        </div>
      </ ErrorBoundry>
    );
  }
}
