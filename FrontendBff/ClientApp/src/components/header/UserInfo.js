import React from 'react';
import { useAuthUser } from '../../services/authService';
import styles from './UserInfo.module.scss';

export default function UserInfo() {
    const { username, logoutUrl, isLoading } = useAuthUser();

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div className={`d-flex align-items-center ${styles.userInfo}`}>
            {
                !username ? (
                    <>
                        <a
                            href="/bff/login"
                        >
                            Login
                        </a>
                        {/* 
                        todo: read more about redirection. doesn't work when I try to create redirection url manually
                        <a
                            href=
                        >
                            Register
                        </a> */}
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
