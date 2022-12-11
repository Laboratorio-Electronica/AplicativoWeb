import React from 'react'

function clearCookie() {
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        window.location.href = '/login';
    });
}

const LogOut = () => {
    return (
        <div>
            {clearCookie()}
        </div>
    )
}

export default LogOut
