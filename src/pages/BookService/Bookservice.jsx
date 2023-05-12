import { useLoaderData } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";


const Bookservice = () => {
    const service = useLoaderData();
    const {user} = useContext(AuthContext)
    useTitle('book');
    const {_id,img, title, price}= service;
    const handleBookService = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            CustomerName: name,
            email,
            date,
            img,
            service: title,
            service_id: _id,
            price: price,
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking),
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId){
                alert('data added successfully')
            }
        })
    }
    return (
        <div>
            <h3 className="text-center text-3xl">Book service: {title}</h3>
            <form onSubmit={handleBookService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name="date" className="input input-bordered" />
                    
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due amount</span>
                    </label>
                    <input type="text"defaultValue={'$'+price} className="input input-bordered" />                    
                    </div>
                </div>
                <div className="form-control mt-6">
                <input type="submit" className="btn btn-block" value="Order confirm" />
                </div>
            </form>
            <div className="card-body">
                   
            </div>
        </div>
    );
};

export default Bookservice;