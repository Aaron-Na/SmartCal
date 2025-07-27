import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    // State to track current user
    const [user, setUser] = useState(null);
    
    // Create Google Auth Provider
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = async () => {
        console.log("Starting Google Sign-in...")
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google Sign-in Received")
        const user = result.user;
        console.log("User Signed In:", user);
        setUser(user);
        

        
    
    };

    return (
        <div>
            <h2>Login</h2>  
            <button onClick={handleGoogleSignIn}> Sign In with Google</button>
        </div>
    );
};

export default Login;