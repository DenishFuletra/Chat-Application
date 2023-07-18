import React from 'react';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@chakra-ui/react';

const GoogleLogin = () => {
    const handleClick = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            console.log(data);
            // Sign-in successful, do something here
        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request') {
                // The user canceled the sign-in popup
                // You can display a message to the user here or just ignore the error
                console.log('Sign-in with Google canceled by the user.');
            } else {
                // Handle other sign-in errors here
                console.log('Error during sign-in:', error);
            }
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <Button
                width="100%"
                border="2px"
                borderColor="purple.500"
                style={{ marginTop: 10 }}
                onClick={handleClick}
            >
                Sign in with Google
            </Button>
        </div>
    );
};

export default GoogleLogin;
