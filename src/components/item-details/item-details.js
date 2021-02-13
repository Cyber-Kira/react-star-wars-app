import React from 'react';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{ label }</span>
      <span>{ item[field] }</span>
    </li>
  )
};

const ItemDetails = (props) => {
  const { data, image, children } = props;

  if (!data) {
    return (
      <div className="item-details card">
        <span className="not-selected">Please select an item from the list</span>
      </div>
    )
  }

  return (
    <div className="item-details card">
      <ItemView
        item={data}
        image={image}
        children={children} />
    </div>
  );
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

export {
  ItemDetails,
  Record
}