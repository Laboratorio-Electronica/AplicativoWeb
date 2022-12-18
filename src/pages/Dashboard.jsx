import React, { useEffect, useState } from 'react'
import { validateToken, nameCookie } from '../modules/token'

import Header from '../components/Header'

import '../styles/pages/Dashboard.css'

const Dashboard = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        validateToken()
        setName(nameCookie)
    }, [])

    return (
        <div className='dashboard-container'>
            <Header />
            <h1 className='container-welcome'>{`Welcome ${name} to the laboratory`}</h1>
        </div>
    )
}

export default Dashboard
