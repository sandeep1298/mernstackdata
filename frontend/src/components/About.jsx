import React, { useEffect, useState  } from 'react';
import profile from '../profile.png';
import {useHistory  } from 'react-router-dom';

export default function About(){

    const history =  useHistory();
    const [fetchuser, setFetchuser] = useState('');
   
    const callAboutpage = async()=>{
        try{
const res = await fetch('/about',{
    method:"GET",
    headers:{
    Accept:"application/json",
        "Content-Type": "application/json"
    },
    credentials:"include"
});
const data = await res.json();
// console.log(data);
setFetchuser(data);
console.log(fetchuser);

if(!res.status === 200){
    const error = new Error(res.error);
    throw error;
}
}catch(err){
console.log(err);
history.push('/login');
        }
    }
    useEffect(() => {
       callAboutpage();
    }, []);

    const ddb = new Date(fetchuser.dob);
    const date = ddb.toDateString();
return(
    <>
    <div className="container   pb-5 mb-5">
        <div className="card w-100 card-center bg-about ">
        <div className="card-body">
        <form method="GET">
            <div className="row ">
                <div className="col-lg-2 col-md-2 col-12 col-sm-12 text-center image-center ">
                    <img src={profile} alt="profile" width="100" height="100"/>
                    
                </div>
                <div className="col-lg-8 col-md-8 col-12 col-sm-12 text-center ">
                    <h4 className="text-dark font-weight-bold text-capitalize">{fetchuser.name}</h4>
                    <h6 className="text-secondary text-capitalize">{fetchuser.work}</h6>
                   
                </div>
            </div>
            <hr className="border-black"/>
            <h4 className="text-center text-default mt-3">A Small Description About Myself </h4>
            <hr className="border-black"/>
      <div className="">
        <div className="row">
        
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center ">
        <p>NAME</p>
        </div>
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p className="text-primary">{fetchuser.name}</p>
        </div>
        </div>
        <hr className="border-black"/>
        <div className="row">
        
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p>EMAIL</p>
        </div>
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p className="text-primary">{fetchuser.email}</p>
        </div>
        </div>
        <hr className="border-black"/>
        <div className="row">
        
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p>Date-of-Birth</p>
        </div>
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p className="text-primary">{date}</p>
        </div>
        </div>
        <hr className="border-black"/>
        <div className="row">
        
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p>Phone Number</p>
        </div>
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p className="text-primary">{fetchuser.phone}</p>
        </div>
        </div>
        <hr className="border-black"/>
        <div className="row">
        
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p>DATE OF BIRTH</p>
        </div>
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p className="text-primary">21-01-1998</p>
        </div>
        </div>
<hr className="border-black"/>
        <div className="row mb-2">
        
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p>Skills</p>
        </div>
        <div className="col-lg-6 col-md-6 col-12 col-sm-12 text-center">
        <p className="text-primary">React js, Bootstrap, Css, HTML</p>
        </div>
        </div>
       
       
       
        
      </div>
        </form>
        </div>
        </div>
    </div>
    </>
)
}