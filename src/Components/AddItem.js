import React, { useState, useEffect } from 'react';
import { storage, auth, db } from '../firebase';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { getDoc, setDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import Camera from './svg/Camera';

const AddItem = () => {
    const [img, setImg] = useState("");
    const [user, setUser] = useState();
    const history = useHistory();

    const [data, setData] = useState({
        itemName: '',
        itemDes: '',
        error: '',
        loading: 'false'
    });

    useEffect(() => {
        getDoc(doc(db, "itemInfo", `${auth.currentUser.uid} - ${itemName}`)).then((docSnap) => {
          if (docSnap.exists) {
            setUser(docSnap.data());
          }
        });
    
        if (img) {
          const uploadImg = async () => {
            const imgRef = ref(
              storage,
              `item/${new Date().getTime()} - ${img.name}`
            );
            try {
              const snap = await uploadBytes(imgRef, img);
              const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    
              await updateDoc(doc(db, "itemInfo",`${auth.currentUser.uid} - ${itemName}`), {
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
    
    
    const { itemName, itemDes, error, loading } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: false });
        if (!itemName || !itemDes) {
            setData({ ...data, error: 'All fields are required' });
        } try {
            await setDoc(doc(db, 'itemInfo', `${auth.currentUser.uid} - ${itemName}`), {
                uid: auth.currentUser.uid,
                itemName,
                itemDes,
                createdAt: Timestamp.fromDate(new Date()),
            });
            setData({
                itemName: '',
                itemDes: '',
                error: null,
                loading: 'false'
            });
            history.replace("/");
        } catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    }
    return (
        <div className="container">
            <h1>Add your Item</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">Item Name</label>
                    <input type="text" className="form-control" id="itemName" value={itemName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemDes" className="form-label">Item Description</label>
                    <input type="text" className="form-control" id="itemDes" value={itemDes} onChange={handleChange} />
                </div>
                <label htmlFor="photo">
                  <Camera />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="photo"
                  onChange={(e) => setImg(e.target.files[0])}
                  />
                {error ? <p>{error}</p> : null}
                <button type="submit" className="btn btn-primary " onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
};

export default AddItem;
