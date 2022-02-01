import React from 'react';
import Img from '../image1.webp';
const User = ({ user, name }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={user.avatar || Img} className="card-img-top" alt="avatar" />
            <div className="card-body">
                <p className="card-text">{user.itemName}</p>
                <p className="card-text">{name.name}</p>
            </div>
        </div>
    )
};

export default User;
