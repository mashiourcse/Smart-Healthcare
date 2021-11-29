import React from "react";
import { useHistory } from "react-router";
import "./Service.css";

import ServiceDetails from "../ServiceDetails/ServiceDetails";
const Service = (props) => {
    //   console.log(props);
    const { name, image ,id, description } = props.service;
    
    //console.log(props.service);
    let history = useHistory();
    
    const handleRideClick = serviceId => {
        const url = `/service/${serviceId}`;
        history.push(url);
    }
    return (
        <div onClick={()=>handleRideClick(id)} className="service">
            <img src={image} alt="" />
            <h4>{name}</h4>
            <p>{description.substr(0,30) + '......'}</p>
            <button className="btn btn-info" >Click For Details</button>            
        </div>
    );
};

export default Service;

