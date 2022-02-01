import React from 'react';
import Img from '../image1.webp';
const User = ({ user, name}) => {
    return <div className="container">
        <div className="row">
                <div class="col-4 card my-4 mx-2" style={{ width: '18rem' }}>
                    <img src={user.avatar || Img} class="card-img-top" alt="avatar" />
                    <div class="card-body">
                    <p class="card-text">{user.itemName}</p>
                </div>
            </div>
        </div>
    </div>
};

export default User;
