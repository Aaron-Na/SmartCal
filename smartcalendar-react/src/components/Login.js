import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import LoginPage from './LoginPage';

const Login = () => {
    const [user, setUser] = useState(null);
    const [showLoginPage, setShowLoginPage] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Auth state changed", currentUser ? "User is signed in" : "User is signed out");
            // Hide login page when user signs in
            if (currentUser) {
                setShowLoginPage(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleShowLoginPage = () => {
        setShowLoginPage(true);
    };

    const handleLoginSuccess = () => {
        setShowLoginPage(false);
    };

    const handleSignOut = async () => {
        console.log("Starting Google Sign-out...");
        await signOut(auth);
        console.log("User Signed Out");
        setUser(null);
    };

    // If showing login page, render it full screen
    if (showLoginPage) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    const loginButtonStyle = {
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const containerStyle = {
        position: 'fixed',
        top: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        zIndex: 1000,
        backgroundColor: 'transparent'
    };

    const userInfoStyle = {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '300px'
    };

    const signOutButtonStyle = {
        backgroundColor: '#ea4335',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        marginTop: '15px'
    };

    return (
        <div style={containerStyle}>
            {user ? (
                // Show user profile when logged in
                <div style={userInfoStyle}>
                    <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            marginBottom: '10px'
                        }}
                    />
                    <p style={{ margin: '0 0 10px 0', color: '#202124', fontSize: '12px', fontWeight: '500' }}>{user.displayName}</p>
                    <button 
                        onClick={handleSignOut}
                        style={signOutButtonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#d33b2c';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#ea4335';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                // Show login button when not logged in
                <button 
                    onClick={handleShowLoginPage}
                    style={loginButtonStyle}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#5a67d8';
                        e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#667eea';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    Login
                </button>
            )}
        </div>
    );
};

export default Login;