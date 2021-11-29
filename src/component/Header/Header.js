import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faMedkit } from '@fortawesome/free-solid-svg-icons';
import '../../utilities/fakedb';
import { addToDb,clearLoggedIn } from '../../utilities/fakedb';
const Header = () => {

  let history = useHistory();
  const handleClick = () => {
    history.push('/login')
  }
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { name } = loggedInUser;

  //console.log( JSON.stringify(loggedInUser) === '{}');
  
  // Storing user info in localstorage
  const storeAtLocalStorage =() =>{
      if(JSON.stringify(loggedInUser) !== '{}'){
        console.log(loggedInUser);
        addToDb(loggedInUser);
      }
  }
  storeAtLocalStorage();


  const handleLogOut = () => {
    
    
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
       // console.log("sign out successfully");
        setLoggedInUser({});
        clearLoggedIn();
        history.push('/login');
      }).catch((error) => {
        // An error happened.
      });

}
  
  return (
    <nav className="container navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link to="/home">
          <h1 className="navbar-brand" href="#">
            <FontAwesomeIcon icon={faMedkit} /><span> Smart HealthCare</span>
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link active"
                aria-current="page"
              >
                Home
                </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/about" className="nav-link active">
                About
                </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link active">
                Contact
                </Link>
            </li>
            <li className="nav-item">
              {
                name ? <Link to="" className="nav-link disabled">
                  <strong className="text-dark">{name}</strong>
                </Link>
                
                  : <button onClick={handleClick} className="nav-link btn btn-danger btn-lg text-white p-1">
                    Login
                </button>
              }
            </li>
            <li className="nav-item">
              {
                name ? <button onClick={handleLogOut} className="nav-link btn btn-danger btn-lg text-white p-1">
                Logout
            </button>
                
                  : ''
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Header;