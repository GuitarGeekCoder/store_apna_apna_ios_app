import { useContext, createContext, useState } from 'react';
import { useStorageState } from '../hooks/useStorageState';
// import userLoginSuccess from '../json/mockData/userLoginSuccess.json'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/formSlice';
// import { LOGIN_ROUTE, LOGOUT_ROUTE, makeRequest } from '../utility/Api/Apicall';
const AuthContext = createContext({
  signIn: async () => null,
  signOut:  async () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  // if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  // }

  return value;
}

export function SessionProvider({ children }) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const dispatch = useDispatch()
    const signIn = async (email,password) => {
      console.log("i am in the reques func")
      // Simulate sign-in logic (e.g., API call)
        // TODO: add api call here to log the user in the app
        // let response = await makeRequest(LOGIN_ROUTE,{username:email,password},'post')
        // console.log('login response: ',response)
        let response = {"status":200,"data":{"user":{"username":email,"password":password}}}
        if(response?.status == 200){
          console.log("seting up seesion")
          setSession(JSON.stringify(response.data.user)); // Set session token or object
          console.log("setted up seesion")
        }
        return response
    };
  
    const signOut = async () => {
      try{
          // ToDo: Simulate sign-out logic with an api call
              setTimeout(() => {
                setSession(null);
                dispatch(setCurrentUser(null))
              }, 3000);
            
            return {
              success : false,
              status : 200, 
              message : "logout success."
            }
      }catch(error){
          console.log('error logging out user '+ error.message)
          return {
            success : false,
            status : 500, 
            message : "Internal server error."
          }
      }
    };
  
    return (
      <AuthContext.Provider
        value={{
          signIn,
          signOut,
          session,
          isLoading,
        }}>
        {children}
      </AuthContext.Provider>
    );
  }
