import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([]);
    console.log(services);
    useEffect(() => {
        fetch('https://car-doctor-server-dusky.vercel.app/services/services')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])
    return (
        <div className="my-5">
            <div className="text-center">
                <h3 className="text-2xl text-orange-600">Services</h3>
                <h3 className="text-5xl">Our Services Area</h3>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;