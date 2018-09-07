import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };
  handleDelete = counterId => {
    let counters = this.state.counters.filter(
      counter => counter.id !== counterId
    );
    this.setState({ counters });
  };
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      console.log(c);
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = counter => {
    let counters = this.state.counters;
    const index = this.state.counters.indexOf(counter);
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    let counters = this.state.counters;
    const index = this.state.counters.indexOf(counter);
    counters[index].value > 0 ? counters[index].value-- : null;
    this.setState({ counters });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar
          totalcounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main role="main" className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onDecrement={this.handleDecrement}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
