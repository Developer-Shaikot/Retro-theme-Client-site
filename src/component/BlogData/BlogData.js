import React from 'react';

const BlogData = (props) => {
    const { name, imageURL,description } = props.blog
    const imageStyle = { hight: '100%',width:'50%', borderRadius: '2px' }
    return (
        <div>
           <div className="text-center" >
           <br />
                <h1 className="text-white">{name}</h1>
                <br />
                <p className="text-white">{description}</p>
                <strong>
                    {name}</strong>
                <br />
                <img style={imageStyle}  src={imageURL} alt="" />
            </div>
        </div>
    );
};

export default BlogData;