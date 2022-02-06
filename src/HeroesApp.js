import { useEffect, useReducer } from "react";
import { AutContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";
import { AppRoute } from "./routers/AppRoute";

const init = ()=>{
    return JSON.parse( localStorage.getItem('user') ) || { logged : false }; // verifica si existe el valor en el localstorge
}
export const HeroesApp = () => {
  
  const [user,dispatch] = useReducer(authReducer,{},init); // se establece un valor inicial al reducer
  
  useEffect( () =>{
    if( !user) return;
       localStorage.setItem('user', JSON.stringify(user)); // esta revisando si el user subre in efector para guardar en el local storege
  },[user])

  return (
    <AutContext.Provider value={{
      user,
      dispatch

    }}>
       <AppRoute />
    </AutContext.Provider>
    
    )
};
