import React,{ useEffect, useState } from 'react';

export default function Home(){
    const [fetchusername, setFetchusername] = useState('');
   const [show, setShow]= useState(false);
    const userHome = async()=>{
        try{
const res = await fetch('/contact',{
    method:"GET",
    headers:{
        "Content-Type": "application/json"
    },
});
const data = await res.json();
 console.log(data);
setFetchusername(data.name);
setShow(true);
//console.log(fetchusername);


}catch(err){
console.log(err);

        }
    }

    useEffect(() => {
       userHome();
    }, []);

    return(
        <>
        <div className=" home-center">
            <h4 className="font-weight-bold text-white ">WELCOME TO MY HOME PAGE</h4>
            {/*<h1 className="text-white capital">{fetchusername}</h1>*/}

            <h2 className="text-white text-capitalize">{ show ? `WELCOME BACK ${fetchusername}` : 'MERN DEVELOPER'}</h2>
        </div>    
        </>

    )
}