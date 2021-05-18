import React from 'react';
import {NavLink} from 'react-router-dom';
import error from '../404.jpg';

export default function Error(){
    return(
<>
    <div>
        <img src={error} className="page-image " alt="404" />
    </div>
    <div className="text-center">
        <h2 className=" text-white found font-weight-bold">Page Not Found </h2>
        <NavLink className="btn btn-secondary btn-round" to="/"><i className="fas fa-home"></i> Back to Home</NavLink>
    </div>
      
</>
    )
}