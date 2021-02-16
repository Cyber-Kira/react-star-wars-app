import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{ label }</span>
      <span>{ item[field] }</span>
    </li>
  )
};

export {
  Record
}
export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: true,
    error: false
  }

  onItemLoaded = (item) => {
    const {getImageUrl} = this.props;
    
    this.setState({
      item,
      loading: false,
      image: getImageUrl(item)
     });
  };

  onError = (error) => {
    this.setState({ 
      error: true,
      loading: false
    });
  };

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    
    getData(itemId)
      .then(this.onItemLoaded)
      .catch(this.onError);
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    };
  }
  
  render() {
    const { item, loading, error, image } = this.state;

    if (!item) {
      return (
        <div className="item-details card">
          <span className="not-selected">Please select an item from the list</span>
        </div>
      )
    }

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemView 
                                item={item} 
                                image={image}
                                children={this.props.children} /> : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  };
};

const ItemView = ({ item, image, children }) => {

  const { name } = item;

  return (
    <>
        <img className="item-image"
          src={image} alt="item" />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>
    </>
  )
};