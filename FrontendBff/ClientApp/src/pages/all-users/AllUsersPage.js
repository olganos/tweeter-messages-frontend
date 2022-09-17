import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserList from '../../components/users/UserList';
import { getAllUsers } from '../../services/tweets-service';

export default function AllUsersPage() {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.tweets.allUsers);

    useEffect(() => { dispatch(getAllUsers()) }, []);

    return (
        <>
            <h1>All users</h1>
            <p>
                Choose a user whose tweets you want to read
            </p>
            <UserList data={allUsers} />
        </>
    );
}
