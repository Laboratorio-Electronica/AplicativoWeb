import React, { useState } from 'react'
import { FaUserAlt, FaKey } from 'react-icons/fa'
import generateToken from '../modules/token'

import '../styles/pages/Login.css'

import Logo from '../assets/Logo.png'


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(true);
    
    function submitCredentials(event) {
        event.preventDefault();
        generateToken(username, password).then(res => res.json()).then(cred => {
            document.cookie = `token=${cred.token}; max-age=${60*60}; path=/;samesite=strict`;
            document.cookie = `name=${cred.name}; max-age=${60*60}; path=/;samesite=strict`;
            document.cookie = `role=${cred.role}; max-age=${60*60}; path=/;samesite=strict`;
            if (cred.token !== 'noToken') {
                setStatus(true)
                window.location.href = '/';
            } else {
                setStatus(false)
            }
        })
    }

    return (
        <div className='login-container'>
            <img className="login-frontPage" />
            <form action="submit" className="login-form">
                <img src={Logo} alt="Logo" className="form-logo" />
                <h1 className="form-title">Welcome</h1>
                <div className="form-input">
                    <FaUserAlt className='icon' />
                    <input type="text" placeholder="User name" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-input">
                    <FaKey className='icon' />
                    <input type="password" placeholder="Password" autoComplete="off" onChange={e => setPassword(e.target.value)}/>
                </div>
                <p id="statusLogin">{
                    status ? '' : "Username or password is incorrect"
                }</p>
                <div className="form-buttons">
                    <button onClick={submitCredentials}>Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default Login
