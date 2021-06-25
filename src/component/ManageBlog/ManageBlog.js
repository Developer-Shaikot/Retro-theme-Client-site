import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ManageBlogData from '../ManageBlogData/ManageBlogData';
import { useParams } from 'react-router-dom';
const ManageBlog = () => {
    const { id } = useParams();
    const [manage, setManage] = useState([])


    useEffect(() => {
        const url = `http://localhost:5055/addBlogs`;
        fetch(url)
        .then(res => res.json())
        .then(data => setManage(data));
    },[id])

    return (
        <div className="back">
            <Navbar></Navbar>
            <div  className="container">
            <h2 style={{color: 'white'}}>Manage Blogs</h2>
            <div style={{marginLeft:'15%',marginRight:'15%'}} className="row d-flex align-items-center p-5" >
           
            {
                manage.length === 0 && <div className="text-white">...Loading</div>
            }
            {
                manage.map(manage => <ManageBlogData manage={manage}></ManageBlogData>)
            }

            </div>
        </div>

        </div>
    );
};

export default ManageBlog;