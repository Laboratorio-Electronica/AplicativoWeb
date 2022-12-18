import React, { useEffect, useState } from 'react'
import { validateToken, nameCookie, role } from '../modules/token'

import Header from '../components/Header'
import AddUser from '../components/AddUser'

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
            {/* {console.log(role === ' developer')} */}
            <div className='container-welcome'>
                <h1>
                    {`Welcome ${name} to the laboratory`}
                </h1>
                {(
                    role === "developer" ||
                    role === ' developer' ||
                    role === ' admin' ||
                    role === 'admin'
                ) ? <AddUser /> : ''}
            </div>
        </div>
    )
}

export default Dashboard
