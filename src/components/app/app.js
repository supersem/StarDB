import React, {Component} from 'react';

import Header from '../header';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry/error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, PlanetPage, StarshipPage  } from '../pages';
import StarshipDetails from "../sw-components/starship-details";

import './app.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  state = {
    swapiService: new DummySwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {

      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <Route path="/" render={() => <h2>Welcome to StarDB</h2>}
                exact />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetPage} />
              <Route path="/starships" exact component={StarshipPage} />
              <Route path="/starships/:id"
                     render={({ match }) => {
                       const { id } = match.params;
                       return <StarshipDetails itemId={id} />
                     }} />

            </div>
        </ Router>
        </ SwapiServiceProvider>
      </ ErrorBoundry>
    );
  }
}
