import { useSelector } from 'react-redux';
import styles from './UserInfo.module.scss';

export default function UserInfo() {
    const userName = useSelector((state) => state.auth.userName);
    const isLoading = useSelector((state) => state.auth.userInfoLoading);
    const logoutUrl = useSelector((state) => state.auth.logoutUrl);
    const logoinUrl = useSelector((state) => state.auth.logoinUrl);

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div className={`d-flex align-items-center ${styles.userInfo}`}>
            {
                !userName ? (
                    <>
                        <a
                            href={logoinUrl}
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
                        <span>{`Hi, ${userName}!`}</span><a
                            href={logoutUrl}
                        >
                            Logout
                        </a>
                    </>
                )
            }
        </div>
    )
}
