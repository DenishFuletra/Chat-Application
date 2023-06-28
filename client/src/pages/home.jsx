import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../component/authentication/login'
import Signup from '../component/authentication/signup'


export default function Home() {

    return (
        <Container maxW='xl' centerContent pt={5} >
            <Box d='flex'
                justifyContent='center'
                p={3}
                w='100%'
                m='50px 0 0 0'
                borderRadius='15px'
                
            >
                <Text textAlign='center' fontSize='xl'>Buddy Messenger</Text>
            </Box>
            <Box d='flex'
                justifyContent='center'
                p={3}
                background='white'
                w='100%'
                borderRadius='15px'
                m='20px 0 0 0'>
                <Tabs variant='soft-rounded' colorScheme='purple'>
                    <TabList>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {<Login />}
                        </TabPanel>
                        <TabPanel>
                            {<Signup />}
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>
        </Container>
    )
}
