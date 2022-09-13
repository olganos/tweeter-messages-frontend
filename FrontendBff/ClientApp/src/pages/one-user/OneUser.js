import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TweetList from '../../components/tweets/TweetList';

export default function OneUser() {
    const { userName } = useParams();
    const [userTweets, setUserTweets] = useState([]);

    const readApi = async () => {
        var req = new Request(`read/api/v1.0/tweets/${userName}`, {
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
            setUserTweets(data);
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    useEffect(() => {
        readApi();
    }, []);

    return (
        <>
            <h1>@{userName}'s tweets</h1>
            <TweetList data={userTweets} />
        </>
    );
}