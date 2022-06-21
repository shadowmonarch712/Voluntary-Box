import React from 'react';
import Attachment from './svg/Attachment';

const messageForm = ({ handleSubmit, text, setText, chat }) => {
    return (
        chat && 
        <form className="message_Form" onSubmit={handleSubmit}>
            <label htmlFor="img"><Attachment /></label>
            <input type="file" id="img" accept='image/*' style={{ display: 'none' }} />
            <div>
                <input type="text" placeholder='Enter message' value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div>
            <button type="button" className="btn btn-primary mx-2">Send</button>
            </div>
        </form>

    )
};

export default messageForm;
