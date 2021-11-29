import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "firebase/auth";


import { createContext, useEffect, useState } from 'react';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import Login from './component/Login/Login';

import About from './component/About/About';
import Contact from './component/Contact/Contact';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import NotFound from './component/NotFound/NotFound';
import Footer from './component/Footer/Footer';
import ServiceDetails from './component/ServiceDetails/ServiceDetails';
import {getLoggedIn} from './utilities/fakedb';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  
  // Using useEffect to store user logging info into 
  useEffect(()=>{
    let localStorageLog = getLoggedIn();
    console.log(localStorageLog);
    
    if(JSON.stringify(localStorageLog) !== '{}'){
    setLoggedInUser(localStorageLog);
  }
 

  }, []);

  //console.log(loggedInUser);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser ]}>
      <Router>
        <Header></Header>
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/home">
            <Home/>
          </Route>


          <PrivateRoute path="/contact">
            <Contact/>
          </PrivateRoute>

          <PrivateRoute path="/about">
            <About/>
          </PrivateRoute>

          <PrivateRoute path="/service/:serviceId">
            <ServiceDetails />
          </PrivateRoute>

          <Route exact path="/">
            <Home />
          </Route>
          
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
