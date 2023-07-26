import React from 'react';
import { Button } from '@chakra-ui/react';


const GoogleLogin = () => {
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

    return (
        <div style={{ width: '100%' }}>
            <Button
                width="100%"
                border="2px"
                borderColor="purple.500"
                style={{ marginTop: 10 }}
                onClick={() => { handleClick() }}
                leftIcon={<i className="fa-brands fa-google"></i>}
            >
                Continue with Google
            </Button>

        </div >
    );
};

export default GoogleLogin;
