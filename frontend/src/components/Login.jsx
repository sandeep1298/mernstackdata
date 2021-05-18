import React  ,{useContext, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {userContext} from "../App";

export default function Login(){
    const {state, dispatch} = useContext(userContext);
    const history = useHistory();
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
   const loginuser = async(e)=>{
       e.preventDefault();
      const res = await fetch('/login',{
          method:"POST",
          headers:{
              'Content-Type': "application/json"
          },
          body:JSON.stringify({
              email,
              password
          })

      });
const data =res.json();
if(res.status === 400 || !data){
    window.alert("Invalid Credentials");
}else{
    dispatch({type:"USER", payload:true})
    window.alert("Login Successfully");
    history.push("/");
}
      
   }
    return(
        <>
        <div className="container  flex-center mt-5 pt-5 mb-4">
            <div className="card bg-light-gray w-80">
                <h4 className="card-header primary-color text-center text-white font-weight-bold">Login Here</h4>
                    <div className="card-body">
                        <form method="POST">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="email"><i className="fas fa-user"></i> Your Email</label>
                                        <input type="email" className="form-control" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="password"><i className="fas fa-unlock-alt"></i> Your Password</label>
                                        <input type="password" className="form-control" name="firstname" value={password} onChange={(e)=> setPassword(e.target.value)} id="password" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" onClick={loginuser} className=" btn btn-secondary font-weight-bold">Login</button>
                            </div>
                            <div className="text-center mt-2">
                                <NavLink to="/register" className="text-purple"><h5>Create an Account </h5></NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>                
        </>
    )
}