import React, { Component } from 'react';

class  Navbar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-light bg-light">
              <a className="navbar-brand" href="#">Navbar</a>
              <span className="badge badge-pill badge-secondary">{this.props.totalcounters}</span>
            </nav> );
    }
}
 
export default Navbar ;