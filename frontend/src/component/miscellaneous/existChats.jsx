import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";



const ExistChats = ({ handleFunction, user }) => {
    console.log(user);

    // Check if user or users array is undefined or empty
    if (!user || !user.users || user.users.length === 0) {
        return null; // or you can return a loading indicator or placeholder
    }

    const secondUser = user.users[1];

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
                <Text>{secondUser.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {secondUser.email}
                </Text>
            </Box>
        </Box>
    );
};


export default ExistChats;