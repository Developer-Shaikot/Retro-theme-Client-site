import React from 'react';
import './Blog.css'
import { Link } from 'react-router-dom';

const Blog = (props) => {
    const {name,imageURL,_id} = props.blog;
    return (
        <div class="container">
           
            <div >
            <Link className="click" to={`/blogDetail/${_id}`}>
                    <div class="col p-5">
                        <div class="card panda-card h-100 shadow">
                            <img src={imageURL} class="card-img-top" alt="" />
                             <div class="card-body">
                                <h5 className="pra" >{name}</h5>
                                   
                                <small className="pra" class="text-muted">@Retro Themed Blog</small>
                             </div>
                        </div>
                     </div>
                </Link> 
             </div>
         </div>
    );
};

export default Blog;