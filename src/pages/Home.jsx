import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Vite from './Vite'

// const URL = 'http://192.168.59.28:1234';
const URL = 'https://server-backend-production.up.railway.app'

function findIndex(data, value) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].includes(`${value}`)) {
            return data[i].replace(`${value}=`, '')
        }
    }
}

const Dashboard = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (document.cookie === '') {
            window.location.href = '/login';
        }
        
        const cookie = document.cookie.split(';');
        var token = findIndex(cookie, 'token');
        setName(findIndex(cookie, 'name'))

        fetch(`${URL}/test`, {
            method: 'POST',
            headers: {
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(data => {
                // setName(data.name)
                if (data.msg !== 'Congratulations') {
                    window.location.href = '/login';
                }
            })
    }, [])

    return (
        <div>
            <Header />
            <h1 className='container-welcome'>{`Welcome ${name} to the laboratory`}</h1>
            {/* <Vite /> */}
        </div>
    )
}

export default Dashboard
