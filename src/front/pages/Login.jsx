import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import React, { useEffect, useState } from "react"

export const Login = () => {
  // Access the global state using the custom hook.

const { store, dispatch } = useGlobalReducer()
const[email,setEmail] = useState("")
const[password,setPassword] = useState("")

const login = ()=>{
        const option={
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,  //these values in the body "" come from the backend, they must match exactly so that the backend can access the values using the request.json.get
                "password": password
              })
        }           
        fetch(import.meta.env.VITE_BACKEND_URL+ "api/login", option) //this is the base url from the backend
        .then((resp)=>{
        
            return resp.json()
        })
        .then((data)=> {
            dispatch({type: "update_token", payload: data.token_value})
        })
    }
    const 
  return (
    <div className="container text-center mt-5">
			<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" className="me-3" />
            <input onChange={(e) => setPassword(e.target.value)} value={password}  type="password" placeholder="Password" className="me-2" />
			<button onClick ={()=>login()} className="btn btn-secondary rounded-pill border">LOGIN</button>
    </div>
  );
};