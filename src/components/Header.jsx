import React, { useEffect, useState } from 'react'
import logo from '../assets/Logo.png'

import User from '../components/User'

import '../styles/Header.css'

import { FaUserCog } from "react-icons/fa";

const Header = () => {
    const [user, setUser] = useState(false)

    return (
        <div className='header-container'>
            <img src={logo} alt="Logo" className='header-logo' />
            <ul className='header-items'>
                <li className='selected'>Dashboard</li>
                <li>Records</li>
                <li>Spare parts</li>
            </ul>
            <div>
                <button onClick={() => setUser(!user)}>
                    <FaUserCog className='icon'/>
                </button>
                {user ? <User /> : ''}
            </div>
        </div>
    )
}

export default Header
