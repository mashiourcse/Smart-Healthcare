import React, { useEffect, useState } from "react";
import serviceData from "../../ServiceData/ServiceData";

import Newsletter from "../Newsletter/Newsletter";
import Service from "../Service/Service";
import "./Home.css";
import CarouselSection from "./Carousel/Carousel";
const Home = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServices(serviceData);
  }, []);
  return (
    <div>
      
    <div className="service-container">
        <CarouselSection></CarouselSection>
        </div>
    
    <div className="service-container">
      {services.map((service) => (
        <Service key={service.id} service={service}></Service>
      ))}
    </div>

        <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
