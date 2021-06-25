import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const ManageBlogData = (props) => {

    const deleteBlog = id => {
            
    }

    const {name,_id} = props.manage
    return (
        <div className="container">
            <li className="text-white">{name}</li>
            <li className="text-white">{_id}</li>
           

            <DeleteOutlineIcon className="text-white" onclick={() => deleteBlog(_id)}></DeleteOutlineIcon>
            
        </div>
    );
};

export default ManageBlogData;