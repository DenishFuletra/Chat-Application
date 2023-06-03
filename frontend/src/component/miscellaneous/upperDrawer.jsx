import React from 'react'
import { useState } from 'react'
import { Tooltip, border } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'
import { Search2Icon, CloseIcon } from '@chakra-ui/icons'
import './upperDrawer.css';



export default function UpperDrawer() {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

    return (
        <div id='style-upperDrawer' >
            <Tooltip label="Hey, I'm here!" aria-label='A tooltip' width='70%'>
                <InputGroup size='md' >
                    <Input

                        type='text'
                        placeholder='Search the User'
                    />
                    <InputRightElement>
                        {search === '' ? <Search2Icon /> : <CloseIcon />}

                    </InputRightElement>
                </InputGroup>
            </Tooltip>
            <Button width="20%" border='2px'
                borderColor='purple.500'
            >
                signup
            </Button>
        </div>
    )
}
