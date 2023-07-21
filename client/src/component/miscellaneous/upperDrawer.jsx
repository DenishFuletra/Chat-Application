import React, { useEffect, useCallback } from 'react';
import {
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { Search2Icon, CloseIcon, BellIcon } from '@chakra-ui/icons';
import './upperDrawer.css';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,

} from '@chakra-ui/react';
import { ChatState } from '../../contex/chatProvider';
import ProfileModal from '../modal/profileModal';
import ResetPasswordModal from '../modal/resetPasswordModal'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSenderName } from './myChat'
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import Cookies from 'js-cookie';


export default function UpperDrawer({ setLoading, search, setSearch }) {
    const { user, setUser, setSearchResult, notification, setNotification, setSelectedChat } = ChatState();
    const navigate = useNavigate();
    console.log(notification);

    useEffect(() => {

    }, [search]);

    const signOut = () => {
        localStorage.removeItem('userData');
        Cookies.remove('id');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('profile');
        Cookies.remove('token');
        setUser({});
        window.location.reload();
        navigate('/');
    };

    const debounce = (func, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedAxiosCall = useCallback(
        debounce(async (searchValue, headers) => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BASEURL}/api/user/getAllUsers?search=${searchValue}`, headers);
                console.log(result);
                setSearchResult(result.data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }, 200),
        []
    );

    const resultSearch = async (e) => {
        setLoading(true);
        const searchValue = e.target.value;
        if (searchValue === '') {
            setSearch('');
            setSearchResult([]);
            setLoading(false);
            return;
        }
        setSearch(searchValue);
        try {
            const headers = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            debouncedAxiosCall(searchValue, headers);
        } catch (error) {
            console.log(error.message)
        }
    };

    const removeSearch = () => {
        setSearch('');
        setSearchResult([]);
    };

    return (
        <div id='style-upperDrawer'>

            <InputGroup size='md' color='white'>
                <Input
                    type='text'
                    value={search}
                    placeholder='Search the User'
                    onChange={(e) => { resultSearch(e) }}
                    border='2px solid white'
                    _placeholder={{ color: '#adb5bd' }}

                />
                <InputRightElement>
                    {search === '' ? <Search2Icon /> : <CloseIcon onClick={() => removeSearch()} fontSize='xs' />}
                </InputRightElement>
            </InputGroup>

            <Menu bg='#2e2e2e'>
                <MenuButton p={1} >
                    <NotificationBadge
                        count={notification.length}
                        effect={Effect.SCALE}
                    />
                    <BellIcon fontSize='2xl' m={1} />
                </MenuButton>
                <MenuList pl={4}>
                    {!notification.length && "No New Messages"}
                    {notification.map((elem) => {
                        return <MenuItem bg='#2e2e2e' key={elem._id} onClick={() => {
                            setSelectedChat(elem.chat);
                            setNotification(notification.filter((n) => n !== elem));
                        }}>{elem.chat.isGroupChat ? `New Message in ${elem.chat.chatName}` : `New Message from ${getSenderName(user, elem.chat.users)} `}</MenuItem>

                    })}
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton >
                    <Avatar size='sm' name={user.name} src={user.profile} cursor='pointer' />
                </MenuButton>
                <MenuList bg='#2e2e2e'>
                    <ProfileModal user={user}>
                        <MenuItem bg='#2e2e2e'>Profile</MenuItem>
                    </ProfileModal>
                    <ResetPasswordModal>
                        <MenuItem bg='#2e2e2e'>Reset Password</MenuItem>
                    </ResetPasswordModal>
                    <MenuItem bg='#2e2e2e' onClick={signOut}>Sign Out</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}
