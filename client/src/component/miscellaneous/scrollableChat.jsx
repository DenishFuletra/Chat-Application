import React from "react";
import ScrollableFeed from 'react-scrollable-feed'


const ScrollableChat = ({ message }) => {
    console.log(message);
    return (
        <ScrollableFeed>
            {message && message.map((elem, id) => (

                <div style={{ display: 'flex' }} key={id}>
                    {elem.content}
                </div>

            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat;