import React from 'react';
import Testimonial from '../Testimonial/Testimonial';
import Navbar from '../Navbar/Navbar';
import './Testimonial.css';



const testimonialData = [
    {
        name : 'Wilson Harry',
        quote : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non architecto nobis, adipisci recusandae repellat accusantium consequuntur, qui nisi deserunt blanditiis mollitia, illo! ',
        
        from : 'California',
      
    },
    {
        quote : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non architecto nobis, adipisci recusandae repellat accusantium consequuntur, qui nisi deserunt blanditiis mollitia, illo! ',
        name : 'Ema Gomez',
        from : 'California',
      
    },
    {
        quote : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non architecto nobis, adipisci recusandae repellat accusantium consequuntur, qui nisi deserunt blanditiis mollitia, illo! ',
        name : 'Aliza Farari',
        from : 'California',
        
    }
]

const Testimonials = () => {
    return (

       <section  className="back">
           <Navbar></Navbar>
           <div  className="container">
               <div className="section-header">
                   <h2 className="text-primary text-uppercase mt-5 mb-3">Testimonial</h2>
                   <h4 style={{color: 'white'}}>What People Says </h4>
               </div>
               <div style={{marginLeft:'15%'}} className="d-flex justify-content-center" className="w-75 row mt-5">
                    {
                        testimonialData.map(testimonial => <Testimonial testimonial={testimonial} key={testimonial.name}/>)
                    }
                </div>
           </div>
       </section>
    );
};

export default Testimonials;