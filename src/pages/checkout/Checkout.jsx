import { useLoaderData } from "react-router-dom";


const Checkout = () => {
    const service = useLoaderData();
    const { title}= service;
    return (
        <div>
            <h3>checkout: {title}</h3>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    
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

export default Checkout;