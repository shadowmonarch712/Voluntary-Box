import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../Context/Auth';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const handleSignout = async () => {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: false,
        });
        await signOut(auth);
        history.replace('/Login');
    }
    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Voluntary Box</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        {user ?
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/Profile">My Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/AddItem">Add Item</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn text-light" onClick={handleSignout} > Logout</button>
                                    </li>
                                </ul>
                            </>
                            :
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/Register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/Login">Log in</Link>
                                </li>
                            </ul>
                        }
                    </span>
                </div>
            </div>
        </nav>
    </div>;
};

export default Navbar;
