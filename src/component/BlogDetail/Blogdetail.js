import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BlogData from '../BlogData/BlogData';
const Blogdetail = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState([])


    useEffect(() => {
        const url = `https://rocky-inlet-75686.herokuapp.com/addBlog/${id}`;
        fetch(url)
            .then(res => res.json())
            // .then(data => console.log(data[0]))
            .then(data => setBlog(data[0]))
            ;
    }, [id])


    return (
        <div className="back">
            <Navbar></Navbar>
            <div className="row">
            
            <div className="container">
            {
                blog.length === 0 && <div className="container text-white">...Loading</div>
            }

                <BlogData blog={blog}>

                </BlogData>

            </div>
           
        </div>
        <footer class="text-center mt-3 pt-3 mb-3 ml-5 justify-content-end text-light">@Retro Themed Blog {(new Date()).getFullYear()} Copyright All Rights Reserved</footer>
        <br />
        </div>
    );
};

export default Blogdetail;