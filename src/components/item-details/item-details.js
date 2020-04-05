import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class itemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateitem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateitem();
    }
  }

  updateitem() {
    const { itemId, getData,getImageUrl } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  }

  render() {

    const { item, image } = this.state;

    if (!item) {
      return <span>Select an item from a list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>

          <ErrorButton />

        </div>
      </div>
    )
  }
}