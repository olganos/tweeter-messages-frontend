import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserList from '../../components/users/UserList';

export default function SearchUsers() {
    const [users, setUsers] = useState([]);
    const { userName } = useParams();

    useEffect(() => {
        usersApi();
    }, [userName]);

    const usersApi = async () => {
        var req = new Request(`read/api/v1.0/tweets/user/search/${userName}`, {
            headers: new Headers({
                "X-CSRF": "1",
            }),
        });

        try {
            var resp = await fetch(req);

            let data;
            if (resp.ok) {
                data = await resp.json();
            }
            setUsers(data);
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    return (
        <>
            <h1>search results for "{userName}"</h1>
            <p>
                Choose a user whose tweets you want to read
            </p>
            <UserList data={users} />
        </>
    );
}
