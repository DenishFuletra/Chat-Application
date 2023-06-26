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

export default function UpperDrawer({ setLoading, search, setSearch }) {
    const { user, setSearchResult } = ChatState();
    const navigate = useNavigate();

    useEffect(() => {

    }, [search]);

    const signOut = () => {
        localStorage.removeItem('user');
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
                    _placeholder={{ color: 'yellow' }}

                />
                <InputRightElement>
                    {search === '' ? <Search2Icon /> : <CloseIcon onClick={() => removeSearch()} fontSize='xs' />}
                </InputRightElement>
            </InputGroup>

            <Menu>
                <MenuButton p={1}>
                    <BellIcon color='white' fontSize='2xl' m={1} />
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
                    <ResetPasswordModal>
                        <MenuItem>Reset Password</MenuItem>
                    </ResetPasswordModal>
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}
