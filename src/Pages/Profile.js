import React, { useState, useEffect } from 'react';
import Camera from '../Components/svg/Camera';
import Delete from '../Components/svg/Delete';
import Img from '../image1.webp'
import { storage, db, auth } from '../firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useHistory } from "react-router-dom";
import User from '../Components/User';
import { collection, query, where, onSnapshot, QuerySnapshot } from 'firebase/firestore';

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const history = useHistory("");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userRef = collection(db, 'itemInfo');
    // query object
    const q = query(userRef, where('uid', 'in', [auth.currentUser.uid]))
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

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
        history.replace("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return user ? (<>
    <div className="container my-2 d-flex justify-content-center">

      <div className="profile_container">
        <div className="img_container">
          <img src={user.avatar || Img} alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>Name : {user.name}</h3>
          <p>Email id: {user.email}</p>
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </div>
    <div className="container">
      <h3>My ads:</h3>
      {users.map(user => <User key={user.uid} user={user} />)}
    </div>
  </>
  ) : null;
};

export default Profile;