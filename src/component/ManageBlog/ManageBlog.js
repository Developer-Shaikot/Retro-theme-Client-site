import React, { useState } from 'react';
import './ManageBlog.css';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ManageBlogData from '../ManageBlogData/ManageBlogData';
import { Link, useParams } from 'react-router-dom';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AddIcon from '@material-ui/icons/Add';

const ManageBlog = () => {
    const { id } = useParams();
    const [manage, setManage] = useState([])


    useEffect(() => {
        const url = `https://rocky-inlet-75686.herokuapp.com/addBlogs`;
        fetch(url)
        .then(res => res.json())
        .then(data => setManage(data));
    },[id])

    return (
        <div className="back">
             <Navbar></Navbar>
           
            <div >
            {
                manage.length === 0 && <div className="text-white">...Loading</div>
            }<div className="row d-flex" style={{textAlign: 'center'}} >
  
            <div  className="bar-container" >
            <h4 style={{color:'blue'}} className="mt-1 mb-5">
                Blogs
            </h4>
            <div >
            <Link className="manage" to="/manage"><ClearAllIcon> </ClearAllIcon> <strong className="p-2">Manage blogs </strong></Link>
            <br/>
            <br />
            <Link className="manage"  to="/admin"><AddIcon></AddIcon> <strong  className="p-2">Add blogs</strong></Link>
            
            </div>
            </div>
            <div className="col" >
           
           
           {
               manage.map(manage => <ManageBlogData manage={manage}></ManageBlogData>)
           }
                </div>
               
        </div>
            </div>
            {/* <footer class="text-center mt-3 pt-3 mb-3 ml-5 justify-content-end text-light">@Retro Themed Blog {(new Date()).getFullYear()} Copyright All Rights Reserved</footer>
        <br /> */}
        </div>
       
    );
};

export default ManageBlog;