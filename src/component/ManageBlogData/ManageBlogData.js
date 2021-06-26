import React from 'react';
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
    <div className="container">
        <li className="text-white">{name}</li>
        <li className="text-white">{_id}</li>


        <DeleteOutlineIcon className="text-white" onClick={() => deleteBlog(_id)}></DeleteOutlineIcon>

    </div>
);
};

export default ManageBlogData;