import React, { useEffect, useState } from 'react'
import User from '../components/User'
import Menu from '../components/Menu'

import { FaUserCog } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai"
import logo from '../assets/Logo.png'

import '../styles/components/Header.css'

const Header = () => {
    const [popupUser, setPopupUser] = useState(false)
    const [popupMenu, setPopupMenu] = useState(false)

    return (
        <div className='header-container'>
            <img src={logo} alt="Logo" className='header-logo' />

            <div className='header-items'>
                <Menu />
            </div>

            <div className='header-menu'>
                <button onClick={() => {
                    setPopupMenu(!popupMenu)
                    setPopupUser(false)
                }}>
                    <AiOutlineMenu className='header-icon' />
                </button>
                {popupMenu ? <div className='header-menu-items'><Menu /></div> : ''}
            </div>

            <div className='header-user'>
                <button onClick={() => {
                    setPopupUser(!popupUser)
                    setPopupMenu(false)
                }}>
                    <FaUserCog className='header-icon'/>
                </button>
                {popupUser ? <User /> : ''}
            </div>
        </div>
    )
}

export default Header
