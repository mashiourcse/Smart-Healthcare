import React from "react";
import "./Footer.css";
import ReactDOM from "react-dom";
import FreeSpace from '../FreeSpace/FreeSpace';
const Footer = () => {
  return (

    
    <div>
      <FreeSpace></FreeSpace>
      <div className="footer-container">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="left-container text-start">
                <h1>Web Programming Hero Assignment 10</h1>
                <div className="icons-container d-flex text-center ">
                  
                </div>
                <p className="mt-4 ">
                  
                </p>

                <p className="mt-5">
                  <small>Mashiour Rahman© . All rights reserved.</small>
                </p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer-menu-container">
               
              </div>
            </div>
            <div className="col-md-5">
              <div className="right-footer-container">
               
                <div className="phone d-flex align-items-center justify-content-center mt-4">
                 
                  
                </div>
                <div className="map d-flex align-items-center justify-content-center">
                  
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
