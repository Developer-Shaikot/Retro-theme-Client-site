import React, { useState } from 'react';
import './Admin.css';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar/Navbar';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

const Admin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const blogData = {
            name: data.name,
            description:data.description,
            imageURL: imageURL
        }
        const url = `https://rocky-inlet-75686.herokuapp.com/addBlogs`

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        })
        .then(res => console.log ('server side responded',res))
    };



    const handleImageUpload = event =>{
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'c0ff542b5a259d5519c36fdec59edd85');
        imageData.append('image',event.target.files[0])
    
        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    
    
      }



    return (
        <div className="back">
        <Navbar></Navbar>
        <div className="row d-flex " style={{textAlign: 'center'}} class="side-container">
        
        <div  className="bar-container">
        <h4 style={{color:'blue'}} className="mt-1 mb-5">
            Blogs
        </h4>
        <div >
        <a className="manage" href="/manage"><ClearAllIcon> </ClearAllIcon> <strong className="p-2">Manage blogs </strong></a>
        <br/>
        <br />
        <a className="manage"  href="/admin"><AddIcon></AddIcon> <strong  className="p-2">Add blogs</strong></a>
        <div className="manage-side">
       
        </div>
        </div>
        </div>
        <div className="orders-container ml-5 mr-5 ">
        <h1 className="text-white mt-2 mb-5">Add Blogs here</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            
        <label className="text-success">Upload Image</label> 
        <input className="form-control "  name="exampleRequired" type="file" onChange={handleImageUpload} />
        <br/>

        <label className="text-success">Title</label>
        <input className="form-control"    defaultValue="" {...register("name")} />
        <br/>

        <label className="text-success">Description</label>
        <textarea {...register("description", { required: true })} className="form-control" name='description' rows="5" id="description"  />
        <br/>

        <input className="form-control bg-success"  type="submit" />
          
     </form>
     <footer class="text-center mt-3 pt-3 mb-3 ml-5 justify-content-end text-light">@Retro Themed Blog {(new Date()).getFullYear()} Copyright All Rights Reserved</footer>
    <br />
     </div>
     </div>
    </div>
    );
};

export default Admin;