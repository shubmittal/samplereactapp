import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = ({user}) => {
    return ( 

       <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">Vidly</NavLink>
           <div className="collapse navbar-collapse">
               <ul className="navbar-nav mr-auto">
                   <li className="nav-item">
                      <NavLink className="nav-link" to = "/movies">Movies</NavLink>
                   </li>
                   <li className="nav-item">
                      <NavLink className="nav-link" to = "/customers">Customers</NavLink>
                   </li>
                   <li className="nav-item">
                      <NavLink className="nav-link" to = "/rentals">Rentals</NavLink>
                   </li>
                  
                  {!user &&
                
                  (<React.Fragment>
                  <li className="nav-item ml-auto">
                      <NavLink className="nav-link" to = "/login">Login</NavLink>
                   </li>
                   <li className="nav-item ml-auto">
                      <NavLink className="nav-link" to = "/register">Register</NavLink>
                   </li>
                   </React.Fragment>)
                }

                {
                    user &&
                    (<React.Fragment>
                        <li className="nav-item">
                            <NavLink className="nav-link" to = "/profile">Hello {user.name}</NavLink>
                         </li>
                         <li className="nav-item">
                            <NavLink className="nav-link" to = "/logout">Logout</NavLink>
                         </li>
                         </React.Fragment>)


                }
               </ul>
           </div>
       </nav>


     );
}
 
export default NavBar ;
