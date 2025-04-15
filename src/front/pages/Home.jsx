import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const[email,setEmail] = useState("")
	const[password,setPassword] = useState("")

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
		fetch(import.meta.env.VITE_BACKEND_URL+"api/login", option) //this is the base url from the backend
		.then((resp)=>{
			return resp.json()
		})
		.then((data)=> console.log(data, "this is my agenda")) 
		} //this data is the repsonse from the backend which is the token which is defined in the routes.py

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div>
			<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} value={password}  type="text" placeholder="Password" />
			<button onClick ={()=>login()}>Login</button>
		</div>
	);
}; 