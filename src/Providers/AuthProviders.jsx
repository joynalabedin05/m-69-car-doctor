import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
const auth = getAuth(app);

export const AuthContext = createContext()

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email, password);
    }

    const googleSignin = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            if( currentUser && currentUser.email){
                const loggedUser = {
                    email : currentUser.email
                }
                fetch('http://localhost:5000/jwt',{
                    method: 'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log('jwt response',data);
                    // localstorage is not the best, it is second best to access token
                    localStorage.setItem('car-access-token', data.token);
                })
            }
            else{
            localStorage.removeItem('car-access-token');
            }
        })
        return ()=>{
            return unsubscribe();
        }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignin,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;