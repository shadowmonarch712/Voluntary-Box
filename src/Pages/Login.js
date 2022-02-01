import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        error: '',
        loading: 'false'
    });
    const history = useHistory();
    const { email, password, error, loading } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: false });
        if (!email || !password) {
            setData({ ...data, error: 'All fields are required' });
        }try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            await updateDoc(doc(db, 'users', result.user.uid), {
                isOnline: true
            });
            setData({
                name: '',
                email: '',
                password: '',
                error: null,
                loading: false
            });
            history.replace("/");
        } catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    }
    return <div>
        <h1>Create An Account</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={handleChange} />
            </div>
            {error ? <p>{error}</p> : null}
            <button type="submit" className="btn btn-primary" disabled={loading===true ? true : false} onClick={handleSubmit}>{loading===true? 'Logging in...' : 'Login'}</button>
        </form>
    </div>;
};

export default Login;
