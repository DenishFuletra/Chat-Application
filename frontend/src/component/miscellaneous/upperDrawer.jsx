import React, { useEffect } from 'react'
import { useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import {
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { Search2Icon, CloseIcon, BellIcon } from '@chakra-ui/icons'
import './upperDrawer.css';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    MenuDivider
} from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider'
import ProfileModal from '../modal/profileModal'
import { useNavigate } from 'react-router-dom'



export default function UpperDrawer() {
    const { user, setUser } = ChatState();
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const navigate = useNavigate();
    console.log(user)
    useEffect(() => {

    }, [search])

    const signOut = () => {
        localStorage.removeItem('user');
        navigate('/')
    }

    return (
        <div id='style-upperDrawer' >
            <Tooltip label="Hey, I'm here!" aria-label='A tooltip' width='70%'>
                <InputGroup size='md' >
                    <Input
                        type='text'
                        placeholder='Search the User'
                        onChange={(e) => { setSearch(e.target.value) }}
                    />
                    <InputRightElement>
                        {search === '' ? <Search2Icon /> : <CloseIcon fontSize='xs' />}

                    </InputRightElement>
                </InputGroup>
            </Tooltip>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon fontSize='2xl' m={1} />
                </MenuButton>
                <MenuList>
                    <MenuItem>Download</MenuItem>

                    <MenuItem>Create a Copy</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton>
                    <Avatar size='sm' name={user.name} src={user.picture} cursor='pointer' />
                </MenuButton>
                <MenuList>
                    <ProfileModal user={user}>
                        <MenuItem>Profile</MenuItem>
                    </ProfileModal>
                    <MenuItem>Reset Password</MenuItem>
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>

                </MenuList>
            </Menu>
        </div>
    )
}
