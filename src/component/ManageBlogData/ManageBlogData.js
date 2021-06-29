import React from 'react';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const ManageBlogData = (props) => {

    const deleteBlog =   id =>  {
        fetch(`https://rocky-inlet-75686.herokuapp.com/deleteBlog/${id}`, {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => {
      console.log("data");
    // Do some stuff...
  })
  .catch(err => console.log(err));
    
}

const { name, _id } = props.manage
// console.log(_id);
return (
  <div>
 
  
  <div className=" container">
  <li className="text-success">{name}</li>
        <li className="text-light">{_id}</li>
        <Link to={"/"}>
        <DeleteOutlineIcon className="click" onClick={() => deleteBlog(_id)}></DeleteOutlineIcon>
        </Link>
</div>
</div>

  
);
};

export default ManageBlogData;