import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';
import Home from '../Home/Home';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const locationBoxStyle = { 
    backgroundColor:'rgb(214, 230, 179)' , color:'purple',border: 'none', borderRadius:'20px',margin:'50px', 
    padding:'30px',
    textAlign:'center',
    textDecoration:'none'
}

  const [loggedInUser,setLoggedInUser ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })

  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }



  return (
    <div className="back">
        <Navbar></Navbar>
        <div className="container">
        <div className=" p-2" style={{textAlign: 'center', marginLeft:'10%',marginRight:'10%'}}>
    <div>
      <h1 className="text-white">Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label className="text-white" htmlFor="newUser">New User Sign up</label>
      <form style={locationBoxStyle} className="form-horizontal"  onSubmit={handleSubmit}>
        {newUser && <input className="form-control"  name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input className="form-control"  type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input className="form-control"  type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input className="form-control bg-secondary text-white" variant="outline-primary" type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>

        <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}

      
      { user.isSignedIn ? <button className="form-control bg-light"  onClick={signOut}>Sign Out</button> :
        <button className="form-control bg-dark text-white"  onClick={googleSignIn}> <FontAwesomeIcon className="icon ml-2" icon={faGooglePlusG} /> Sign In With Google</button>
      }
      <br/>
     
      {
        user.isSignedIn && <div>
         <Home></Home>
        </div>
      }
      </form>
     

    </div>
    </div>
        </div>
 
    </div>
  );
}

export default Login;
