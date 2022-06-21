import React, { useState } from 'react';
// import Img from '../image1.webp';
import { useLocation } from 'react-router-dom';
import Attachment from './svg/Attachment';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, Timestamp, orderBy, query, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import MessageForm from './MessageForm';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import Message from './Message';

const ItemSummary = () => {

    const location = useLocation()
    const name = location.state?.name
    const itemName = location.state?.itemName
    const avatar = location.state?.avatar
    const itemDes = location.state?.itemDes
    const uid = location.state?.uid

    // const [chat, setChat] = useState(false);
    // const [text, setText] = useState('');
    // const [msgs, setMsgs] = useState([]);

    // const user1 = auth.currentUser.uid;
    // const user2 = uid;

    // const handleChat = () => {
    //     setChat(true);

    //     const user1 = auth.currentUser.uid;
    //     const user2 = uid;
    //     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    //     const msgsRef = collection(db, 'messages', id, 'chat');
    //     const q = query(msgsRef, orderBy('createdAt', 'asc'));
    //     onSnapshot(q, querySnapshot => {
    //         let msgs = []
    //         querySnapshot.forEach(doc => {
    //             msgs.push(doc.data())
    //         })
    //         setMsgs(msgs);
    //     })
    // }
    // console.log(msgs);

    // const handleSubmit = async e => {
    //     e.preventDefault()
    //     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    //     await addDoc(collection(db, 'messages', id, 'chat'), {
    //         text,
    //         from: user1,
    //         to: user2,
    //         createdAt: Timestamp.fromDate(new Date()),
    //     });
    //     setText("");
    // }

    return (
        <div className="container">
            <img src={avatar} className="rounded mx-auto d-block" alt="avatar"></img>
            <div className="heading">
                <h3> {itemName}</h3>
                <p>{itemDes}</p>
            </div>
            {/* <button type="button" class="btn btn-primary" onClick={handleChat}>Chat with the donnor</button> */}
            {/* {console.log(chat)} */}
            {/* {chat ?
                (
                    <>
                        <div className="message">
                            {msgs.length ?
                                msgs.map((msg, i) => <Message key={i} msg={msg} />)
                                : null}
                        </div>
                        <MessageForm
                            handleSubmit={handleSubmit}
                            text={text}
                            setText={setText}
                            chat={chat} />
                    </>
                )
                :
                (
                    <h3>Start a convo with the donner</h3>
                )
            } */}
            {/* // <div className='d-flex justify-content-center'>
                //     <form className="message_Form">
                //         <label htmlFor="img"><Attachment /></label>
                //         <input type="file" id="img" accept='image/*' style={{ display: 'none', width: '20px' }} />
                //         <input type="text" placeholder='Enter message' className='mx-2' />
                //         <button type="button" className="btn btn-primary mx-2">Send</button>
                //     </form>
                // </div>
            // } */}

        </div>
    );
};

export default ItemSummary;
