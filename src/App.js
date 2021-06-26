import React, { createContext, useState } from "react";

import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './component/Home/Home';
import Login from './component/Login/Login';
import ManageBlog from './component/ManageBlog/ManageBlog'
import Admin from "./component/Admin/Admin";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Blogdetail from "./component/BlogDetail/Blogdetail";
import Testimonials from "./component/Testimonials/Testimonials";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
   <Router className="App">
     <Switch>
       <Route exact path="/">
         <Home></Home>
       </Route>
       <Route path="/manage">  
            <ManageBlog></ManageBlog>        
        </Route>
        <Route path="/blogDetail/:id">
          <Blogdetail/>
        </Route>
        <Route exact path="/reviews">
      
          <Testimonials></Testimonials>
       </Route>
        <PrivateRoute path="/admin">
          <Admin/>
        </PrivateRoute>
       <Route exact path="/login">
        <Login></Login>
       </Route>
     </Switch>
   </Router>
 </UserContext.Provider>
  );
}

export default App;
