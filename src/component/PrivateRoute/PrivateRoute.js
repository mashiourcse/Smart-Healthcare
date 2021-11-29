import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {UserContext } from '../../App';
import { getLoggedIn } from '../../utilities/fakedb';
import { useEffect } from 'react';
const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let localStorageLog = getLoggedIn();
    useEffect(()=>{
        
        console.log(localStorageLog);
        
        if(JSON.stringify(localStorageLog) !== '{}'){
        setLoggedInUser(localStorageLog);
      }
     
    
      }, loggedInUser);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorageLog.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;