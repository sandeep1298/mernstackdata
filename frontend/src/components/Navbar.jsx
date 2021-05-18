import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import {userContext} from "../App";
export default function Navbar() {

  
 const {state, dispatch} = useContext(userContext);
 const RenderMenu =()=>{
   if(state){
     return(
       <>
       <li className="nav-item ">
            <NavLink className="nav-link " activeClassName="active-nav" to="/">Home
             
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " activeClassName="active-nav"  to="/about">About</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link" activeClassName="active-nav"  to="/contact">Contact Us</NavLink>
          </li>
          
          <li className="nav-item ">
            <NavLink to="/logout" className="nav-link" activeClassName="active-nav" >Logout</NavLink>
          </li>
       </>
     )
   }else{
     return(
       <>
       <li className="nav-item">
       <NavLink className="nav-link" to="/">Home
       <span className="sr-only">(current)</span>
     </NavLink>
   </li>
   <li className="nav-item">
     <NavLink className="nav-link" to="/about">About</NavLink>
   </li>
   <li className="nav-item ">
     <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
   </li>
   <li className="nav-item ">
     <NavLink className="nav-link" to="/login">Login</NavLink>
   </li>
   <li className="nav-item ">
     <NavLink to="/register" className="nav-link" >Register</NavLink>
   </li>
   
       </>
     )
   }
 }
  return(
    <> 
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-wheat">
      <h4 className="navbar-brand">MERN</h4>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
      <div className="collapse navbar-collapse" id="basicExampleNav">
        <ul className="navbar-nav ml-auto">
          <RenderMenu/>
        </ul>
      </div>
    </nav>
    </>
  )

}