import React from 'react';

const Testimonial = (props) => {
    const {name,quote,from ,img} = props.testimonial;
    return (
        <div style={{margin:'20px'}} className="col-md-3 bg-light" >
            <div class="card panda-card h-100 shadow">

           
            <div className="card-body">
                <p className="text-primary">{name}</p>
            </div>
            <div className="card">
                <div>
                    <h6 style={{margin:'10px'}} className="card text-center">{quote}</h6>
                    <p className="mt-2 mb-5">{from}</p>
                </div>
            </div>
            </div>
       </div>
    );
};

export default Testimonial;