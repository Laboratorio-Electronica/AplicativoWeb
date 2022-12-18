const URL = 'https://server-backend-production.up.railway.app'
// const URL = 'http://localhost:1234'

let nameCookie
let role
let msgDB

const findIndex = (data, value) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].includes(`${value}`)) {
            return data[i].replace(`${value}=`, '')
        }
    }
}

const generateToken = async (username, password) => {
    const data = { username: username, password: password }

    return await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: data })
    })
}

const validateToken = () => {    
    if (document.cookie === '') {
        window.location.href = '/login';
    } else {
        const cookie = document.cookie.split(';');
        const token = findIndex(cookie, 'token');
        nameCookie = findIndex(cookie, 'name')
        role = findIndex(cookie, 'role')

        fetch(`${URL}/test`, {
            method: 'POST',
            headers: {
                'authorization': token
            }
        }).then(res => res.json()).then(data => {
            if (data.status !== 200) {
                window.location.href = '/login';
            } else {
                document.cookie = `role=${data.role}`;
            }
        })
    }
}

const createUserDB = async (dataUser) => {
    await fetch(`${URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataUser)
            }).then(res => res.json()).then(data => {
                if (data.msg === 'Correct') {
                    window.location.href = '/';
                }
                msgDB = data.msg
            })
}

export default generateToken
export { validateToken, createUserDB, nameCookie, role, msgDB }