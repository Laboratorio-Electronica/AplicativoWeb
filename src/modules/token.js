// const URL = 'https://server-backend-production.up.railway.app'
const URL = 'http://localhost:1234'

let nameCookie

const findIndex = (data, value) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].includes(`${value}`)) {
            return data[i].replace(`${value}=`, '')
        }
    }
}

const validateToken = () => {    
    if (document.cookie === '') {
        window.location.href = '/login';
    } else {
        const cookie = document.cookie.split(';');
        const token = findIndex(cookie, 'token');
        nameCookie = findIndex(cookie, 'name')

        fetch(`${URL}/test`, {
            method: 'POST',
            headers: {
                'authorization': token
            }
        }).then(res => {
            if (res.status !== 200) {
                window.location.href = '/login';
            }
        })
    }
    

}

export { validateToken, nameCookie }