import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";



const UserList = ({ handleFunction, user }) => {


    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg='#2e2e2e'
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            width="100%"
            display="flex"
            flexDirection='row'
            alignItems="center"

            px={3}
            py={2}
            mt='5px'
            borderRadius="lg"

        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    );
};

export default UserList;