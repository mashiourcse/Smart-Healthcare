import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import serviceData from '../../ServiceData/ServiceData';
const ServiceDetails = () => {

    
    const {serviceId} = useParams();
    const history = useHistory();

    const matchedServiceData = serviceData.filter( data => data.id === serviceId);
    //console.log(matchedServiceData[0].description);

    
    return (
        <div>
            { 
                 <div>
                    
                    <div className="service-info">
                        <div className="service-detail-container">
                        <div className="container d-flex justify-content-center align-items-center ">
                                    
                                   
                                    <img className='icon ' src={matchedServiceData[0].image} height='400px' width='500px' alt="" />
                                       
                                       
                                   </div>
                            <div className='row m-5 container d-flex justify-content-center align-items-center service-detail'>
                            

                                <div className="p-5 col-md-7">
                                    <h2>{matchedServiceData[0].name}</h2>
                                   
                                    
                                    
                                    
                                </div>
                                 
                            </div>
                            
                        </div>
                        <div className="description-container d-flex justify-content-center align-items-center">
                            <div className="row p-1 container ">
                                <div className="col-md-12">
                                    <p className="service-description text-justify">{matchedServiceData[0].description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="description-container d-flex justify-content-center align-items-center">
                           
                        </div>
                       
                    </div>
                </div>
            }
        </div>
    );
};

export default ServiceDetails;