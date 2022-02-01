import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import User from '../Components/User';
const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const userRef = collection(db, 'itemInfo');
        // query object
        const q = query(userRef, where('uid', 'not-in', [auth.currentUser.uid]))
        // execute query
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users);
        });
        return () => unsub();
    }, []);

    return <div>
        {users.map(user=> <User key={user.uid} user={user}/>)}
    </div>;
};

export default Home;
