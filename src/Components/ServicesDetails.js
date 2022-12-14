import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { authUser } from '../Context/UserContext';
import useTitle from '../Hook/useTitile';
import Review from './Review';

const ServicesDetails = () => {
    useTitle("ServicesDetails")
    const details = useLoaderData()
    const { user } = useContext(authUser);
    const router = useParams();
    const [reviews, setReviews] = useState();

    const getEmail = (e) => {
        e.preventDefault()
        const form = e.target;
        const textR = form.text.value;
        form.reset()
        if (user) {
            const { displayName, photoURL, email } = user
            const userR = { id: router.id, name: displayName, image: photoURL, text: textR, email: email }
            fetch('https://food-zone-server.vercel.app/reviews', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userR)
            })
                .then(res => res.json())
                .then(result => console.log(result))
        }
    }
    useEffect(() => {
        fetch(`https://food-zone-server.vercel.app/reviews?id=${router.id}`)
            .then(res => res.json())
            .then(data => {
                setReviews(data.data)
            })
    }, [router.id, reviews])

    const { name, image_url, descriptin, price } = details.data;

    return (
        <div className="md:flex p-10">
            <div className="md:w-1/2">
                <div className='w-4/5 mx-auto'>
                    <div className="card  md:w-auto bg-base-100 shadow-xl">
                        <figure><img className=' h-96 w-full' src={image_url} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <div className="">
                                {descriptin}
                            </div>
                            <p>Price :${price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2">
                {user ?
                    <form onSubmit={getEmail} className="my-5 mx-auto text-center">
                        <p className='py-3'>Adde your comment</p>
                        <input type="text" placeholder="Type here" name='text' className="input input-bordered input-md w-full max-w-xs" />
                        <button className='btn mx-3'>commnet</button>
                    </form>
                    :
                    <div className="w-4/5 mx-auto text-center py-5">
                        <p >login for comment</p>
                        <Link to='/login' className='btn btn-info mt-3'>Login</Link>
                    </div>
                }
                <div className="mt-5">
                    <p className='text-2xl mb-3 text-center'>What says Our customers </p>
                </div>
                {
                    reviews?.map(review => <Review key={review._id} review={review}></Review>)
                }
            </div>
        </div>
    );
};
export default ServicesDetails;