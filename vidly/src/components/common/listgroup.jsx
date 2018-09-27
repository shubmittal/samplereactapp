import React from "react";
import PropTypes from "prop-types"

const ListGroup = props => {
  const { items, onItemSelected, textProperty, valueProperty, selectedItem } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li key = {item[valueProperty]} onClick = {() => onItemSelected(item)}
        className = {item === selectedItem ? "list-group-item active": "list-group-item"}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes=
{
    items : PropTypes.array.isRequired,
    valueProperty: PropTypes.string,
    textProperty : PropTypes.string,
    onItemSelected : PropTypes.func.isRequired
}

ListGroup.defaultProps =
{
    valueProperty : "_id",
    textProperty : "name"
}

export default ListGroup;


