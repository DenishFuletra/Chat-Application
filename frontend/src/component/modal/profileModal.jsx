import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Text

} from '@chakra-ui/react'

export default function ProfileModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            {children ? (<span onClick={onOpen}>{children} </span>) : null}
            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent padding='15px'>
                    <ModalHeader
                        fontSize={40}
                        display='flex'
                        justifyContent='center'
                        fontFamily='Work sans'
                    >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src={user.picture}
                            alt={user.name}
                            margin='auto'
                        />
                        <Text
                            fontSize={{ base: '28px', md: '30px' }}
                            fontFamily='Work sans'
                            textAlign='center'
                            marginTop='5px'
                        >{user.email}</Text>


                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
