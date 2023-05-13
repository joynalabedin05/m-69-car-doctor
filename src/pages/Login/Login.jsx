
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import useTitle from '../../hooks/useTitle';
import SocialLogin from '../shared/socialLogin/SocialLogin';
const Login = () => {
    const {signIn}=useContext(AuthContext);
    useTitle('login');
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const handleLogin = event=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email,password);

        signIn(email,password)
        .then(result=>{
            const user = result.user;

            // const loggedUser = {
            //     email : user.email
            // }

            console.log(user);
            navigate(from, { replace: true });

            
            // fetch('https://car-doctor-server-dusky.vercel.app/services/jwt',{
            //     method: 'POST',
            //     headers:{
            //         'content-type':'application/json'
            //     },
            //     body: JSON.stringify(loggedUser)
            // })
            // .then(res=>res.json())
            // .then(data=>{
            //     console.log('jwt response',data);
            //     // localstorage is not the best, it is second best to access token
            //     localStorage.setItem('car-access-token', data.token);
            // })

        })
        .catch(error=>{
            console.log(error);
        })
        
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
            <img src={img} alt="" />
           
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
            <h1 className="text-3xl font-bold">Login now!</h1>
               <form onSubmit={handleLogin}>
               <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="text" name='password' placeholder="password" className="input input-bordered" />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">               
                <input type="submit" className="btn btn-primary" value="Login" />
                </div>
                </form> 
                <p className='mt-2'>New to this car doctors? <Link className='text-orange-600 font-bold' to={'/signup'}>Sign Up</Link> </p>
                <SocialLogin></SocialLogin>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Login;