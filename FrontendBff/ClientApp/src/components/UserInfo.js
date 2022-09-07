import React from 'react';
import { useAuthUser } from '../services/authService';
import './UserInfo.css';

export default function UserInfo() {
    const { username, logoutUrl, isLoading } = useAuthUser();

    if (isLoading)
        return <div>Loading...</div>
console.log(process.env);
    return (
        <div className='d-flex align-items-center user-info'>
            {
                !username ? (
                    <>
                        <a
                            href="/bff/login"
                        >
                            Login
                        </a>
                        <a
                            href={process.env.REACT_APP_AUTH_SERVER_REGISTRATION_URI}
                        >
                            Register
                        </a>
                    </>
                ) : (
                    <>
                        <span>{`Hi, ${username}!`}</span><a
                            href={logoutUrl?.value}
                        >
                            Logout
                        </a>
                    </>
                )
            }
        </div>
    )
}
