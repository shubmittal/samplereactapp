import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    

    render() { 
        return ( 
            <div>
                <button className="btn btn-primary btn-lg m-2" onClick = {() => this.props.onReset()}>Reset</button>
               {
                  this.props.counters.map(counter => 
                  <Counter key = {counter.id} counter = {counter} onDelete = {this.props.onDelete} onIncrement = {this.props.onIncrement} onDecrement = {this.props.onDecrement}>
                  
                  </Counter>)
               }
            </div>
         );
    }
}
 
export default Counters;