import React from "react";
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../contex/chatProvider';






const ScrollableChat = ({ message }) => {
    const { user, selectedChat, setSelectedChat, searchResult } = ChatState();
    console.log(message);
    return (
        <ScrollableFeed className="scroll">
            {message && message.map((elem, id) => (

                <div style={{
                    display: 'flex', fontSize: "18px", width: '100%'
                }} key={id}>
                    <span
                        style={{
                            backgroundColor: `${elem.sender._id === user.id ? "#579570e0" : "grey"}`,
                            marginLeft: `${elem.sender._id === user.id ? "auto" : 0}`,
                            // marginLeft: isSameSenderMargin(message, elem, id, user.id),
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

            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat;