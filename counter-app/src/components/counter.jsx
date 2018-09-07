import React, { Component } from "react";

class Counter extends Component {
  // state = {
  //   value: this.props.counter.value
  // };

  //   constructor()
  //   {
  //       super();
  //       this.handleIncrement = this.handleIncrement.bind(this)
  //   }

  render() {
    const { onDelete, onIncrement, onDecrement, counter } = this.props;
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => {
            onIncrement(counter);
          }}
          className="btn btn-secondary btn-sm m-2 fa fa-plus"
        >
          {" "}
          Increment
        </button>
        <button
          className="btn btn-secondary btn-sm m-2"
          disabled={counter.value === 0}
          onClick={() => onDecrement(counter)}
        >
          Decrement
        </button>
        <button
          className="btn-sm btn-danger btn m-2"
          onClick={() => onDelete(counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
