import React from 'react'
import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@chakra-ui/react'

const GoogleLogin = () => {

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data)
        })
    }
    return (
        <div style={{ width: "100%" }}>
            <Button width="100%" border='2px'
                borderColor='purple.500'
                style={{ marginTop: 10 }}
                onClick={handleClick}
            >
                Signin with Google
            </Button>
        </div>
    )
}

export default GoogleLogin