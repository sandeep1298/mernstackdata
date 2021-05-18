import React, { useEffect, useState  } from 'react';


export default function Contactuspage(){

  
   
    const [fetchuser, setFetchuser] = useState({name:"", email:"", phone:"", message:""});
    
    const userContact = async()=>{
        try{
    const res = await fetch('/contact',{
    method:"GET",
    headers:{
        "Content-Type": "application/json"
        },
    });

    const data = await res.json();
    // console.log(data);
    setFetchuser({...fetchuser , name:data.name, email:data.email , phone:data.phone});
    console.log(fetchuser);

    if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
    }
    }catch(err){
    console.log(err);
        }
    }

    useEffect(() => {
       userContact();
    }, []);

    // storing data in states
        const handleinputs=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFetchuser({...fetchuser,[name]:value });
    }

    //send the data to backend
        const submitform= async(e)=>{
        e.preventDefault();

       

        const {name, email ,phone , message}= fetchuser;

        const res = await fetch('/contactpost',{
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email ,phone , message
            })
        });
        const data = await res.json();
        if(!data){
           
            console.log("message not sent");

        }else{
            alert("message sent");
            setFetchuser({...fetchuser, message:""});
        }
    }
return(
 <>
 <div className="container  flex-center mt-5 pt-5 mb-4">
            <div className="card bg-light-gray w-80">
                <h4 className="card-header primary-color text-center text-white font-weight-bold">Contact Us</h4>
                    <div className="card-body">
                        <form id="" method="POST" >
                        <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-dark" htmlFor="name"><i className="fas fa-user"></i> Your Name</label>
                                        <input type="text" name="name"  value={fetchuser.name} onChange={handleinputs} className="form-control"  id="name" required/>
                                    </div>
                                </div>
                           
                            
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-dark" htmlFor="phone"><i className="fas fa-mobile"></i> Your Phone Number</label>
                                        <input type="number" name="phone" value={fetchuser.phone} onChange={handleinputs} className="form-control "  id="phone" required/>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-dark" htmlFor="email"><i className="fas fa-envelope"></i> Your Email</label>
                                        <input type="email" name="email" value={fetchuser.email} onChange={handleinputs} className="form-control"  id="email" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                <label className="text-dark" htmlFor="address"><i className="fas fa-address-book"></i> Message</label>
                                    <textarea id="address" name="message" value={fetchuser.message}  onChange={handleinputs} className="form-control md-textarea" rows="2" required></textarea>
                                    
                            </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" onClick={submitform} className=" btn btn-success font-weight-bold"><i className="fas fa-submit"></i>Send</button>
                            </div>
                            </form>
                            </div>
                           </div>
                           </div> 
 </>

)
}