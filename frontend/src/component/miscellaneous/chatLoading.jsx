import React from 'react'
import { Skeleton, Stack } from '@chakra-ui/react'

export default function ChatLoading() {
    return (
        <div>
            <Stack>
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
            </Stack>
        </div>
    )
}
