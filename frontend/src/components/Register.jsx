import React ,{useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';


export default function Register(){
    const history = useHistory();
    const [user, setUser]= useState({
        name:"", email:"",phone:"", work:"", password:"", confirmpassword:"",dob:""
    });

    let name, value;
    const handleinput=(e)=>{
        name = e.target.name;
        value=e.target.value;
        setUser({...user, [name]:value})
    };

    // const handlesubmit=(e)=>{
    //     e.preventDefault();
    //     console.log(user);
    // }
    const postdata= async(e)=>{
        e.preventDefault();

        if(user.password !== user.confirmpassword){
            window.alert("confirm password unmatched");
        }else{
            const {name, email,phone, work, password, confirmpassword,dob} = user;

            const res= await fetch("/register",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    name, email,phone, work, password, confirmpassword,dob
                })
            });

            const data = await res.json();
            if(res.status === 422 || !data){
                window.alert("Invalid Registration");
                console.log("Invalid Registration");
            }else{
                window.alert(" Registration Successfull");
                console.log("Successfull Registration");
                history.push("/login");
            }
        }
    }
    return(

        <>
        <div className="container flex-center mt-5 pt-5 mb-5 pb-5">
            <div className="card bg-light-gray w-70">
                <h4 className="card-header primary-color text-center text-white font-weight-bold">Register Here</h4>
                    <div className="card-body">
                        <form method="POST">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="md-form">
                                    <label className="text-dark" htmlFor="name"><i className="fas fa-user"></i> Your Name</label>
                                        <input type="text" className="form-control" name="name" id="name" autoComplete="off"   value={user.name}
                                        onChange={handleinput} required="true" pattern="^[a-zA-Z\s]*$"/>
                                       
                                    </div>
                                </div>     
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">   
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="email"><i className="fas fa-envelope"></i> Enter Your Email Here...</label>
                                        <input type="email" className="form-control" name="email"  id="email" autoComplete="off"  value={user.email}
                                        onChange={handleinput} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                                       
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">   
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="work"><i className="fas fa-briefcase"></i> Your Profession</label>
                                        <input type="text" className="form-control" name="work" id="work" autoComplete="off"  value={user.work}
                                        onChange={handleinput} required pattern="^[a-zA-z]*$"/>
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">   
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="dob"><i className="fas fa-baby"></i> Your Date of birth</label>
                                        <input type="date" className="form-control" name="dob" id="dob" autoComplete="off" min="1980-01-01" max="2016-01-01"  value={user.dob}
                                        onChange={handleinput} required />
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">   
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="phonenumber"><i className="fas fa-mobile"></i> Enter Your Phone Number</label>
                                        <input type="number" className="form-control" name="phone"  id="phonenumber" autoComplete="off"  value={user.phone}
                                        onChange={handleinput} required pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"/>
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">   
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="password"><i className="fas fa-unlock-alt"></i> Your Password</label>
                                        <input type="password" className="form-control" name="password" id="password" autoComplete="off" value={user.password}
                                        onChange={handleinput} required/>
                                    </div>
                                </div>  
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">   
                                    <div className="md-form">
                                        <label className="text-dark" htmlFor="confirmpassword"><i className="fas fa-lock-open"></i> Confirm password</label>
                                        <input type="password" className="form-control" name="confirmpassword"  id="confirmpassword" autoComplete="off"  value={user.confirmpassword}
                                        onChange={handleinput} required/>
                                    </div>
                                </div>  
                            </div>
                            <div className="text-center">
                                <button type="submit" onClick={postdata} className=" btn btn-secondary font-weight-bold">Register</button>
                            </div>
                            <div className="text-center mt-2">
                                <NavLink to="/login" className="text-purple"><h5>Click Here if Already registered </h5></NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}