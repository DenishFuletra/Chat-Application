import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';


//console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const GoogleLogin = ({ setUser }) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const handleClick = async () => {
        const options = {
            redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL,
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ].join(" "),
        };

        const qs = new URLSearchParams(options);


        window.location.href = `${rootUrl}?${qs.toString()}`




    };

    const handleLocalStorage = () => {

        let userData = {
            id: Cookies.get('id'),
            name: Cookies.get('name'),
            email: Cookies.get('email'),
            profile: Cookies.get('profile'),
            token: Cookies.get('token')
        }
        console.log(userData);
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));

    };

    return (
        <div style={{ width: '100%' }}>
            <Button
                width="100%"
                border="2px"
                borderColor="purple.500"
                style={{ marginTop: 10 }}
                onClick={() => { handleClick(); handleLocalStorage(); }}
                leftIcon={<i className="fa-brands fa-google"></i>}
            >
                Continue with Google
            </Button>

        </div >
    );
};

export default GoogleLogin;
