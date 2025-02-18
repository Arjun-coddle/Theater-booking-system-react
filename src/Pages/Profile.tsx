import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import '../Styles/profile.css'

const Profile: React.FC = () => {

    const username = localStorage.getItem('username')
    const navigate = useNavigate();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <Header />
            <div className="profile-container">
                <h1>{username}</h1>
                <button className='profile-logout-button' onClick={handleLogout}>log out</button>
            </div>
            <Footer />
        </div>
    )
}

export default Profile