import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../image1.webp';

const User = ({ user }) => {
    return (
        <Link to={{
            pathname: "/ItemSummary",
            state: {
                itemName: user.itemName,
                name: user.name,
                avatar: user.avatar,
                itemDes: user.itemDes,
                uid: user.uid
            }
        }}>
            <div className="card" style={{ width: '18rem' }}>
                <img src={user.avatar || Img} className="card-img-top" alt="avatar" />
                <div className="card-body">
                    <p className="card-text">{user.itemName}</p>
                    <p className="card-text">{user.name}</p>
                </div>
            </div>
        </Link>
    )
};

export default User;
