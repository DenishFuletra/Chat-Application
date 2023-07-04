import React from "react";
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../contex/chatProvider';
import { Avatar, Tooltip } from "@chakra-ui/react";


const ScrollableChat = ({ message }) => {
    const { user, selectedChat } = ChatState();
    console.log(message);
    return (
        <ScrollableFeed className="scroll">
            {message && !selectedChat.isGroupChat ? (message.map((elem, id) => (

                <div style={{
                    display: 'flex', fontSize: "18px", width: '100%'
                }} key={id}>
                    <span
                        style={{
                            backgroundColor: `${elem.sender._id === user.id ? "#579570e0" : "grey"}`,
                            marginLeft: `${elem.sender._id === user.id ? "auto" : 0}`,
                            marginTop: 5,
                            borderTopLeftRadius: `${elem.sender._id === user.id ? "10px" : "10px"}`,
                            borderTopRightRadius: `${elem.sender._id === user.id ? "10px" : "10px"}`,
                            borderBottomLeftRadius: `${elem.sender._id === user.id ? "10px" : 0}`,
                            borderBottomRightRadius: `${elem.sender._id === user.id ? 0 : "10px"}`,
                            padding: "5px 15px",
                            maxWidth: "75%",
                        }}
                    >
                        {elem.content}
                    </span>
                </div>

            ))) :
                (message.map((elem, id) => (

                    <div style={{
                        display: 'flex', fontSize: "18px", width: '100%'
                    }} key={id}>
                        {elem.sender._id !== user.id ? (
                            <Tooltip label={elem.sender.name}>
                                <Avatar
                                    mr={2}
                                    mt={2}
                                    size="sm"
                                    cursor="pointer"
                                    name={elem.sender.name}
                                />
                            </Tooltip>
                        ) : null}
                        <span
                            style={{
                                backgroundColor: `${elem.sender._id === user.id ? "#579570e0" : "grey"}`,
                                marginLeft: `${elem.sender._id === user.id ? "auto" : 0}`,
                                marginTop: 5,
                                borderTopLeftRadius: `${elem.sender._id === user.id ? "10px" : "10px"}`,
                                borderTopRightRadius: `${elem.sender._id === user.id ? "10px" : "10px"}`,
                                borderBottomLeftRadius: `${elem.sender._id === user.id ? "10px" : 0}`,
                                borderBottomRightRadius: `${elem.sender._id === user.id ? 0 : "10px"}`,
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {elem.content}
                        </span>
                    </div>

                )))
            }
        </ScrollableFeed >
    )
}

export default ScrollableChat;