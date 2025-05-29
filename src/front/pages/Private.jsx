import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  
import { useNavigate } from "react-router-dom";

export const Private = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="text-center mt-5">
            <h1 classname="fw-bold display-5" style={{color:"#9966CC"}}>
                PRIVATE PAGE. Secure Login is SUCCESSFUL!
            </h1>
    
    </div>
  );
};