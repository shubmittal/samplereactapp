import React, { Component } from 'react';

class Like extends Component {
    
    render() { 
        
        return ( 
            
            <span className = {this.props.like ? "fa fa-heart": "fa fa-heart-o"} onClick = {this.props.onToggle}></span>


            
         );
    }
}
 
export default Like;