import React, { useEffect, useState } from 'react';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import Blog from '../Blog/Blog';


const Home = () => {

    const [blogs, setBlogs] = useState([])


    useEffect(() =>{
        fetch('https://rocky-inlet-75686.herokuapp.com/addBlogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
    },[])

    return (
        <div  class="back">
            <Navbar></Navbar>
            <br />
            <p className="container">
                       <strong style={{color: 'rgb(244, 245, 245)', marginTop:'20px', fontFamily: 'Merriweather, serif', fontStyle: 'oblique',fontSize: '30px'}}>Themes and <span className="text-info">Demos List</span>  </strong> 
                    </p>
            <div  className="text-center">
            <div  class="row row-cols-1 row-cols-md-3 g-4 rounded-3 " >
            {
                blogs.length === 0 && <div className="container text-white">...Loading</div>
            }

            {
                blogs.map(blog =><Blog 
                    
                    blog={blog}>
                    </Blog>)
            }
        </div>
        </div>
            <footer class="text-center mt-3 pt-3 mb-3 ml-5 justify-content-end text-light">@Retro Themed Blog {(new Date()).getFullYear()} Copyright All Rights Reserved</footer>
            <br />
        </div>
    );
};

export default Home;