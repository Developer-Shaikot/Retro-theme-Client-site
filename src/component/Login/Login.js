// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";

import firebaseConfig from "./firebase.config";
// import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Navbar from "../Navbar/Navbar";



function Login() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const history = useHistory();
  const location = useLocation();


  const locationBoxStyle = { 
    backgroundColor:'rgb(214, 230, 179)' , color:'purple',border: 'none', borderRadius:'20px',margin:'50px', 
    padding:'30px',
    textAlign:'center',
    textDecoration:'none'
}

  const { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })



  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        // console.log(res.user);
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isLoggedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);

        //  console.log(displayName,email,photoURL);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err);
      })
    //  console.log(user);
  }
  const handleSignOut = () => {
    firebase.auth().signOut().then(res => {
      const signedOutUser = {
        isLoggedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser)
      setLoggedInUser(signedOutUser)
      console.log('response', res);
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  }

  // const handleBlur = (e) => {
  //   let isFieldValid = true;
  //   console.log(e.target.name, e.target.value);
  //   if(e.target.name === 'email'){
  //     isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  //   }
  //   if(e.target.name === 'password'){
  //     const isPasswordValid = e.target.value.length > 6;
  //     const passwordHasNumber =  /\d{1}/.test(e.target.value);
  //     console.log(passwordHasNumber);
  //     isFieldValid = isPasswordValid && passwordHasNumber;
  //   }
  //   console.log(isFieldValid);
  //   if(isFieldValid){
  //     const newUserInfo = {...user};
  //     newUserInfo[e.target.name] = e.target.value;
  //     setUser(newUserInfo);
  //   }
  // }
  const handleBlur = (e) => {
    // debugger;
     console.log(e.target.name,e.target.value);
    let isEmailValid = true;
    if (e.target.name === 'email') {
      isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      //  console.log(e.target.name,isEmailValid);
    }

    if (e.target.name === 'password') {

      const isPasswordValid = e.target.value.length > 6;
      //smart validation  /^([a-z0-9]{8,})$/
      //  const isPasswordValid =/^([a-z0-9]{8,})$/.test(e.target.value)
      const passwordHasNumber = /\d/.test(e.target.value);
      isEmailValid = isPasswordValid && passwordHasNumber;
        console.log(isEmailValid);
    }
    if (isEmailValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo)


    }
    // console.log('last one', isEmailValid);
  }
  const handleSubmit = (e) => {
    console.log(user.password, user.email);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // Signed in 
          // var user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          updateUserName(user.name)
          history.replace(from);
          // ...
        })
        .catch((error) => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)

          // console.log(errorCode);
          // console.log('Used email', errorCode,errorMessage);
          // ..
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);

          console.log('sign in user info', res.user.displayName);

          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
        });
    }
    e.preventDefault();
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('User name updated successfully');
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }


  return (
    <div className="back"  >


      {/* For sign up section */}

      <div className="container">
        <Navbar></Navbar>
        <div className=" p-2" style={{textAlign: 'center', marginLeft:'10%',marginRight:'10%'}}>
        <h3  className="text-white">Retro Authentication</h3>
      

        <form  style={locationBoxStyle} className="form-horizontal"  onSubmit={handleSubmit} >
          
          <br />
          <input className="form-control"   type="text"  onBlur={handleBlur} name="email" placeholder="Enter your email" required />
          <br />

          <input className="form-control"  type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter your password" required />
          <br />
          <input  className="form-control bg-dark text-white" variant="outline-primary" type="submit"  value={newUser ? 'Sign up' : 'Log in'} />
        </form>

        <p style={{ color: 'red' }} >{user.error}</p>
        {
          user.success && <h4 style={{ color: 'green' }} > User {newUser ? 'created' : 'Logged in'} successful </h4>
        }
       
      </div>

      {
        user.isLoggedIn && <div>
          <h3> Welcome {user.name} </h3>
          <p>your email is : {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      }
      </div>
    </div>
  );
}

export default Login;