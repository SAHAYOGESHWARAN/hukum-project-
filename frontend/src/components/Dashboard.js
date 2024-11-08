import React, { useContext } from 'react';
import { AuthContext } from '../authContext';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        setAuth(null);
        history.push('/login');
    };

    return (
        <div>
            <h1>Welcome, {auth ? auth.name : 'Guest'}!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
