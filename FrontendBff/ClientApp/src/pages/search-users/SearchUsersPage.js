import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserList from '../../components/users/UserList';
import { searchByUser } from '../../services/tweets-service';

export default function SearchUsersPage() {
    const { userName } = useParams();

    const dispatch = useDispatch();
    const users = useSelector((state) => state.tweets.allUsers);

    useEffect(() => { dispatch(searchByUser(userName)) }, [userName]);

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
