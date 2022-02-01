import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import UserHome from '../Components/UserHome';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState([]);

    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setName(docSnap.data());
            }
        });
    }, []);

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

    return (
        <div className="container">
            <div className="row my-5">
                {users.map(user =>
                    <div className="col-md-4">
                        <UserHome key={user.uid} user={user} name={name} />
                    </div>
                )}
            </div>
        </div>

    )
};

export default Home;
