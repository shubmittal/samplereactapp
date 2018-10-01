import React from 'react';

const SearchBox = ({value, onChange, ...rest}) => {
    return ( 

        <input type="text" className="form-control m-2" {...rest} placeholder="search" onChange= {e=> onChange(e.currentTarget.value)} value = {value} />

     );
}
 
export default SearchBox;