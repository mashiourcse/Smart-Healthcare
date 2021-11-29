import React from 'react';
import './Newsletter.css'

const Newsletter = () => {
    return (
       <section className="contact my-5 py-5">
           <div className="container">
               <div className="section-header text-center text-white mb-5">
                   
                    <h1>Sign Up For Newsletter</h1>
               </div>
               <div className="col-md-9 mx-auto">
                   <form action="">
                       <div className="form-group">
                           <input type="text" className="form-control" placeholder="Enter Your email "/>
                           <br></br>
                       </div>
                       
                      
                       <div className="form-group text-center">
                           <button type="button" className="btn btn-primary"> Submit </button>
                       </div>
                   </form>
               </div>
           </div>
       </section>
    );
};

export default Newsletter;