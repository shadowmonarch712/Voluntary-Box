import React from 'react';
import Moment from 'react-moment';
const Message = ({msg}) => {
    console.log(msg.text);
    return (<div>
        <p>{msg.text}</p>
        <br />
        {/* <small>
            <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small> */}
    </div>
    )
};

export default Message;
