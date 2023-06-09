import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";



const ExistChats = ({ handleFunction, user }) => {
    console.log(user);

    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            display="flex"
            flexDirection='row'
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            mt='10px'
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
                <Text>{user.users[1].name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.users[1].email}
                </Text>
            </Box>
        </Box>
    );
};

export default ExistChats;