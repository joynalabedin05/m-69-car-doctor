import { useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useState } from "react";
import BookingsRow from "./BookingsRow";
import { useNavigate } from "react-router-dom";
// "alt + shift + f" ,to format code
const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }

            })
            .then(res => res.json())
            
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/')
                }          
            })
    }, [url, navigate]);

    const handleDelete = id =>{
        const proceed = confirm('are you sure you want to delete');
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount> 0){
                    alert('data deleted successfully');
                    const remaining = bookings.filter(booking=> booking._id !== id);
                    setBookings(remaining);
                }
            })
        }
    };

    const handleBookingConfirm = id=>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({status:'confirm'})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                // update state
                const remaining = bookings.filter(booking=>booking._id !==id);
                const updated = bookings.find(booking=>booking._id ===id);
                updated.status = 'confirm';
                const newBookings= [updated, ...remaining];
                setBookings(newBookings);
            }
        })

    }
    return (
        <div>
            <h3 className="text-3xl text-center">Bookings: {bookings.length}</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                        {
                            bookings.map(booking=> <BookingsRow
                            booking={booking}
                            handleDelete={handleDelete}
                            handleBookingConfirm={handleBookingConfirm}
                            key={booking._id}
                            ></BookingsRow> )
                        }
                    </tbody>
                    {/* foot */}

                </table>
            </div>
        </div>
    );
};

export default Bookings;