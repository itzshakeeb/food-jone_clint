import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Service from './Service';

const ServicesSection = () => {
    const services = useLoaderData();
    return (
        <div className="">
            <div className="mt-10 ">
                <p className='text-2xl text-center'>My SerVices</p>
            </div>
            <div className='md:w-4/5 md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-3'>
                {
                    services.data?.map(service => <Service key={service._id} service={service}></Service>)
                }
            </div>
            <div className="text-center py-10 ">
                <Link className='btn btn-outline' to='/Services'>see more</Link>
            </div>
        </div>
    );
};

export default ServicesSection;