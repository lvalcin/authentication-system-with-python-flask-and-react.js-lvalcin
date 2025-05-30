import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const[email,setEmail] = useState("")
	const[password,setPassword] = useState("")
	const navigate = useNavigate()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}
	const signup =()=>{
		const option ={
			method: "POST",
			headers:{
				"Content-Type": "application/json"

			},
			body:JSON.stringify({
				"email":email,
				"password":password
			})
		}
		fetch(import.meta.env.VITE_BACKEND_URL+ "api/signup", option)
		.then((resp)=>{
			return resp.json()
		})
		.then((data)=>{ //this data is the repsonse from the backend, it is the token which is defined in the routes.py
			if (data.token_value){
            dispatch({type: "update_token", payload: data.token_value})
            navigate("/private");}
            else{alert("Signup failed. Please try again.")}
        })
	}	

	useEffect(() => {
		// loadMessage()
	}, [])

	return (
		<div className="container text-center mt-5 w-50"
		style={{backgroundColor:"#663399", width: "300px", height: "300px", borderRadius: "8px",}}>
			<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" className="me-3"/>
            <input onChange={(e) => setPassword(e.target.value)} value={password}  type="password" placeholder="Password" className="me-2" />
			<button  onClick ={()=>signup()} className="btn btn-secondary rounded-pill border">SIGN UP</button>
			<p style={{color:"white"}}>
				Already have an account?
				<Link to="/login" style={{ color: "#20B2AA"}}>
					Continue to Login
				</Link>
			</p>
		</div>
		
	);
}; 