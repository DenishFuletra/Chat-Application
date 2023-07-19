import React from 'react';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

const GoogleLogin = () => {
    const handleClick = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            // console.log(data.user.stsTokenManager.accessToken);

            const headers = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${data.user.stsTokenManager.accessToken}`,
                }
            }
            const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/user/googleAuth`, headers);

            console.log(response);


        } catch (error) {
            if (error.code === 'auth/cancelled-popup-request') {
                console.log('Sign-in with Google canceled by the user.');
            } else {
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
                leftIcon={<i className="fa-brands fa-google"></i>}
            >
                Continue with Google
            </Button>
        </div>
    );
};

export default GoogleLogin;


// let sdata = {
//     "user": {
//         "uid": "T7N01szIykZYHojHY3YUU639vtf1",
//         "email": "fuletradenish@gmail.com",
//         "emailVerified": true,
//         "displayName": "DENISH FULETRA",
//         "isAnonymous": false,
//         "photoURL": "https://lh3.googleusercontent.com/a/AAcHTtdo2nxFBMkj1LO7N1o6W7tt2D_G30Wdkk2FG07mPDS8msQ=s96-c",
//         "providerData": [
//             {
//                 "providerId": "google.com",
//                 "uid": "116673761465410189035",
//                 "displayName": "DENISH FULETRA",
//                 "email": "fuletradenish@gmail.com",
//                 "phoneNumber": null,
//                 "photoURL": "https://lh3.googleusercontent.com/a/AAcHTtdo2nxFBMkj1LO7N1o6W7tt2D_G30Wdkk2FG07mPDS8msQ=s96-c"
//             }
//         ],
//         "stsTokenManager": {
//             "refreshToken": "AMf-vBzWfAI9SwweL4Z9Ao27WiWekmPLucR1KF3cNFUAI2ljbhLN6eUjPXhxoM5Ldk8-ONIqFhzIO-yaA4xxlp4dB8XrxfRdZoQEg9R0tUODhUezSbsR9MePufmGmoJKgOU8guu02Bu-q0ozp_mj5zlarTS47ll39TUx3XCXhpRiXc4gdr82oh9VyEpxobPpdbGIX0pYmTza0IcLn5lLbZK4Icq58oI6e-bBxXf1HTt2G5GH1CYxOYjPqnlIZislsDHA9TbW73o-FJe7KXmzuSiH66nVACRdp78V6OegUElgft089SZlvCEHHQGEufqFXJ0dVtjCgg0yHR0UCbtHjUYvqEp0_xFsiBR4Coe6C8IRQnToh2aQqBVZ3brRzK8rahsSYOYTeVgHYW-v89cebFMTCDVPdpyFHHSFYTFIsPHVQXeo9a0e2JsqPVkT8Id1veHrnkPxM0Ht",
//             "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE0ZWI4YTNiNjgzN2Y2MTU4ZWViNjA3NmU2YThjNDI4YTVmNjJhN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiREVOSVNIIEZVTEVUUkEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZG8ybnhGQk1rajFMTzdOMW82Vzd0dDJEX0czMFdka2syRkcwN21QRFM4bXNRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NoYXQtYXBwLTM5MTgxMCIsImF1ZCI6ImNoYXQtYXBwLTM5MTgxMCIsImF1dGhfdGltZSI6MTY4OTc2MDk4OCwidXNlcl9pZCI6IlQ3TjAxc3pJeWtaWUhvakhZM1lVVTYzOXZ0ZjEiLCJzdWIiOiJUN04wMXN6SXlrWllIb2pIWTNZVVU2Mzl2dGYxIiwiaWF0IjoxNjg5NzYwOTg4LCJleHAiOjE2ODk3NjQ1ODgsImVtYWlsIjoiZnVsZXRyYWRlbmlzaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNjY3Mzc2MTQ2NTQxMDE4OTAzNSJdLCJlbWFpbCI6WyJmdWxldHJhZGVuaXNoQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Vz0Md9j4-9UgEXQAJWMB6LjT6HSbIxvidJG78Q3scb2_ktbhPU1QUhorxEikCaXuHiwhKrFBmq0CGaegzEpzrHiJjWO52i9rINhl2_zt2X5SGHRu1xNWhwbfBq5igRBMQJJhMFKXRkrbIOlAQGXxUXA1RPJAUKOrfDy3967jer6G_hzu6mpDswfDmFYKELN0q848KJCbFiSFIhhCEPKPI3SGu5NSjal9vQS7DEuExw0pzcNa1xNjbab-sMOZWqIGj-FOyx2fMvN7JjiellDcotd3K91NURXWvRuXgkHOL1SsMvgIfVXZxPKC9XDZfrpP1fRqo27aF9Y5iL_Vf3pXxw",
//             "expirationTime": 1689764590289
//         },
//         "createdAt": "1689745007940",
//         "lastLoginAt": "1689760962212",
//         "apiKey": "AIzaSyAJAd3LrKA5xakRVBOGMtmgTYSp-hCLgMA",
//         "appName": "[DEFAULT]"
//     },
//     "providerId": "google.com",
//     "_tokenResponse": {
//         "federatedId": "https://accounts.google.com/116673761465410189035",
//         "providerId": "google.com",
//         "email": "fuletradenish@gmail.com",
//         "emailVerified": true,
//         "firstName": "DENISH",
//         "fullName": "DENISH FULETRA",
//         "lastName": "FULETRA",
//         "photoUrl": "https://lh3.googleusercontent.com/a/AAcHTtdo2nxFBMkj1LO7N1o6W7tt2D_G30Wdkk2FG07mPDS8msQ=s96-c",
//         "localId": "T7N01szIykZYHojHY3YUU639vtf1",
//         "displayName": "DENISH FULETRA",
//         "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE0ZWI4YTNiNjgzN2Y2MTU4ZWViNjA3NmU2YThjNDI4YTVmNjJhN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiREVOSVNIIEZVTEVUUkEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZG8ybnhGQk1rajFMTzdOMW82Vzd0dDJEX0czMFdka2syRkcwN21QRFM4bXNRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NoYXQtYXBwLTM5MTgxMCIsImF1ZCI6ImNoYXQtYXBwLTM5MTgxMCIsImF1dGhfdGltZSI6MTY4OTc2MDk4OCwidXNlcl9pZCI6IlQ3TjAxc3pJeWtaWUhvakhZM1lVVTYzOXZ0ZjEiLCJzdWIiOiJUN04wMXN6SXlrWllIb2pIWTNZVVU2Mzl2dGYxIiwiaWF0IjoxNjg5NzYwOTg4LCJleHAiOjE2ODk3NjQ1ODgsImVtYWlsIjoiZnVsZXRyYWRlbmlzaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNjY3Mzc2MTQ2NTQxMDE4OTAzNSJdLCJlbWFpbCI6WyJmdWxldHJhZGVuaXNoQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Vz0Md9j4-9UgEXQAJWMB6LjT6HSbIxvidJG78Q3scb2_ktbhPU1QUhorxEikCaXuHiwhKrFBmq0CGaegzEpzrHiJjWO52i9rINhl2_zt2X5SGHRu1xNWhwbfBq5igRBMQJJhMFKXRkrbIOlAQGXxUXA1RPJAUKOrfDy3967jer6G_hzu6mpDswfDmFYKELN0q848KJCbFiSFIhhCEPKPI3SGu5NSjal9vQS7DEuExw0pzcNa1xNjbab-sMOZWqIGj-FOyx2fMvN7JjiellDcotd3K91NURXWvRuXgkHOL1SsMvgIfVXZxPKC9XDZfrpP1fRqo27aF9Y5iL_Vf3pXxw",
//         "context": "",
//         "oauthAccessToken": "ya29.a0AbVbY6NNdv0Ye268z_5CFo-UawWgGAp36mPM6jQYjjvCg5RVcUaEVYOkDXL93N1Df7WkxbA-qThtwFUiCVfhfoL18V7sABo3LMi8Tl3ecWk-A5OBooUah_lYXm9DzEnCsW-LKgPujPJXqGBN92GXQS6q7fB7ZAaCgYKAbASARMSFQFWKvPllKxTFsMD2MP8rFTqE5LP3A0165",
//         "oauthExpireIn": 3598,
//         "refreshToken": "AMf-vBzWfAI9SwweL4Z9Ao27WiWekmPLucR1KF3cNFUAI2ljbhLN6eUjPXhxoM5Ldk8-ONIqFhzIO-yaA4xxlp4dB8XrxfRdZoQEg9R0tUODhUezSbsR9MePufmGmoJKgOU8guu02Bu-q0ozp_mj5zlarTS47ll39TUx3XCXhpRiXc4gdr82oh9VyEpxobPpdbGIX0pYmTza0IcLn5lLbZK4Icq58oI6e-bBxXf1HTt2G5GH1CYxOYjPqnlIZislsDHA9TbW73o-FJe7KXmzuSiH66nVACRdp78V6OegUElgft089SZlvCEHHQGEufqFXJ0dVtjCgg0yHR0UCbtHjUYvqEp0_xFsiBR4Coe6C8IRQnToh2aQqBVZ3brRzK8rahsSYOYTeVgHYW-v89cebFMTCDVPdpyFHHSFYTFIsPHVQXeo9a0e2JsqPVkT8Id1veHrnkPxM0Ht",
//         "expiresIn": "3600",
//         "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYmRiZmRlZGUzYmFiYjI2NTFhZmNhMjY3OGRkZThjMGIzNWRmNzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzI0Mjc4OTA0MDE0LTBucGI3a2g2MzhrZThhZGlndGUwdXQ2NTV0dTB1Z2Y5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzI0Mjc4OTA0MDE0LTBucGI3a2g2MzhrZThhZGlndGUwdXQ2NTV0dTB1Z2Y5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2NjczNzYxNDY1NDEwMTg5MDM1IiwiZW1haWwiOiJmdWxldHJhZGVuaXNoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoib0xmZ1IwbDlpMnhaaFZZMmxZMlV1ZyIsImlhdCI6MTY4OTc2MDk4OCwiZXhwIjoxNjg5NzY0NTg4fQ.Hu-FgaaCAqbgBNtDhIjfERGrtvYFbe33BrMgziHFIa5aCF-i7cnMkxyWtxQa9iW_2ifQ85XxCjGbBPTiXvAlnMbNrSN5G6v4Ft8FpkMAYGh1O4ie4TEGVSNX_B4ZksAwG94LnTpo-QDzSStfmqUSy9B3OV1Nc1khoJ8uzCjChWAXneKHQ69BHXHz7SuaZjRz5dx4c0yx-dkd1A2UJ5eqWWDGSJoKilx2aUL0gReA61MlLx8W4oZEv3vtpIf9tO6S7OJAH0BNfeu4PznsjH2tmWUCOFF3QJtidKbZbdMQBpOy_2s1TKJfXV2xoDhYYxtMq-c0XvwHpyqz5eJpoz2E3A",
//         "rawUserInfo": "{\"name\":\"DENISH FULETRA\",\"granted_scopes\":\"https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile\",\"id\":\"116673761465410189035\",\"verified_email\":true,\"given_name\":\"DENISH\",\"locale\":\"en\",\"family_name\":\"FULETRA\",\"email\":\"fuletradenish@gmail.com\",\"picture\":\"https://lh3.googleusercontent.com/a/AAcHTtdo2nxFBMkj1LO7N1o6W7tt2D_G30Wdkk2FG07mPDS8msQ=s96-c\"}",
//         "kind": "identitytoolkit#VerifyAssertionResponse"
//     },
//     "operationType": "signIn"
// }