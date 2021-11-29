import React, { useContext, useState } from 'react';
import googleicon from '../../images/googleicon.png'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import FreeSpace from '../FreeSpace/FreeSpace';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isLogin: false,
        name: '',
        email: '',
        password: '',
        error: '',
        emailError: '',
        passwordError: '',
        success: false,
    })

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirectAuth) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirectAuth) {
            history.replace(from);
        }
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const googleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const userInfo = {
                    isLogin: true,
                    name: displayName,
                    email: email
                }
                handleResponse(userInfo, true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleBlur = (event) => {
        console.log('inside handle Blur');
        let isFormValid = true;
        let password;
        let confirmPassword;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
            if(isFormValid===false){
                user.emailError="email is not valid";
                setUser(user);
            }
        }
        if (event.target.name === 'password') {
            isFormValid = event.target.value.length >= 6;
            if(isFormValid===false){
                user.passwordError="password must be 6 character long";
                setUser(user);
            }
            else{
                password = event.target.value;
            }
        }
        if (event.target.name === 'confirmPassword'){
            confirmPassword = event.target.value;
        }
        if(password!==confirmPassword){
            user.passwordError=`password didn't match`;
            setUser(user);
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    handleResponse(newUserInfo, true);
                    updateNewUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.name=res.user.displayName;
                    newUserInfo.isLogin = true;
                    newUserInfo.success = true;
                    handleResponse(newUserInfo, true);
                    console.log(newUserInfo);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(error.message);
                });
        }
        event.preventDefault();
    }

    const updateNewUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        })
            .then(() => {
                console.log("user name updated")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="custom-form">
            <div className="mt-5 user-form">
                <div className="form-box">
                    <form onSubmit={handleSubmit}>
                        {
                            newUser && <>
                                <input className="form-control mb-2" name="name" type="text" onBlur={handleBlur} placeholder="Your full name" required />
                            </>
                        }
                        <input className="form-control mb-2" type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email " required />
                        {user.emailError &&<p className="text-danger">{user.emailError}</p>}
                        <input className="form-control mb-2" type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required />
                        {
                            newUser && <>
                                <input className="form-control mb-2" name="confirmPassword" type="password" onBlur={handleBlur} placeholder="Confirm password" required />
                            </>
                        }
                         {user.passwordError &&<p className="text-danger">{user.passwordError}</p>}
                        <input className="form-control mb-2 btn btn-primary" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />

                        <Link className="d-flex justify-content-center" onClick={() => setNewUser(!newUser)} to='/login'>{newUser ? 'I have an account' : 'Create New User'}</Link>
                    </form>
                    {user.error&&<p className="text-center text-danger">{user.error}</p>}
                </div>
            </div>
            <div className="mt-3 button-container mb-5">
                {
                    !user.isLogin && <button className="signIn-btn btn btn-secondary" onClick={googleLogin}><img src={googleicon} alt="" /> continue with google</button>
                }
            </div>
           <FreeSpace></FreeSpace>
           <FreeSpace></FreeSpace>
          
        </div>
    );
};

export default Login;
