import React, { useState } from 'react'
import { createUserDB, role, msgDB } from '../modules/token'

import '../styles/components/AddUser.css'

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [roleForm, setRoleForm] = useState('user');
    const [date, setDate] = useState('')
    const [msg, setMsg] = useState('')

    const createUser = (e) => {
        e.preventDefault()

        if (username === '' || name === '' || password === '' || date === '') {
            setMsg('Fill all data')
        } else {
            const dataUser = {username, password, name, role: roleForm, date}
            createUserDB(dataUser).then(() => setMsg(msgDB))
        }
    }

    return (
        <form action="submit" className='addUser-form'>
            <div className='form-container'>
                <div className='form-data'>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role" onChange={e => setRoleForm(e.target.value)}>
                            <option value="user">Technical</option>
                            <option value="admin">Administrator</option>
                            {(
                                role === 'developer' ||
                                role === ' developer'
                            ) ? <option value="developer">Developer</option> : ''}
                            
                        </select>
                    </div>
                </div>
                <div className='form-date' onChange={e => setDate(e.target.value)}>
                    <label htmlFor="date">Date for birthday</label>
                    <input type="date" />
                </div>
            </div>
            <p>{msg}</p>
            <button onClick={createUser}>Add user</button>
        </form>
    )
}

export default AddUser
