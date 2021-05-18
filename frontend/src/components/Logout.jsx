import React, { useContext, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {userContext} from "../App";
export default function Logout(){
    //promises
    const {state, dispatch} = useContext(userContext);
    const history = useHistory();
    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
            Accept:"application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER", payload:false})
                history.push('/login', {replace:true});
                if(!res.status === 200){
                    const error = new Error(res.error);
                    throw error;
                } 
        }).catch((err)=>{
            console.log(err);
        });
    });
return(
    <>
    <h1>This is Logout Page</h1>
    </>
)
}