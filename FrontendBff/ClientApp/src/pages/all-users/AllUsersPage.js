import React, { useState, useEffect } from 'react';
import UserList from '../../components/users/UserList';

export default function AllUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        usersApi();
    }, []);

    const usersApi = async () => {
        var req = new Request("read/api/v1.0/tweets/users/all", {
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
            console.log("Remote API Result: " + resp.status, data);
            setUsers(data);
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    return (
        <>
            <h1>All users</h1>
            <p>
                Choose a user whose tweets you want to read
            </p>
            <UserList data={users} />
        </>
    );
}
