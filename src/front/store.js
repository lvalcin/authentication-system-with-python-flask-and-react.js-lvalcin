export const initialStore=()=>{
  return{
    token:null
  }
}

export default function storeReducer(store, action = {}) {
  if(action.type === "update_token"){ 
    // below is how you update the store
    return {
    ...store,
    token: action.payload //the dispatch will be access with this action.payload
  };

  } 
}
