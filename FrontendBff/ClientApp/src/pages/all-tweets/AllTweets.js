import React, { useState, useEffect } from 'react';
import TweetList from '../../components/tweets/TweetList';

export default function AllTweets() {
    const [read, setRead] = useState([]);

    const readApi = async () => {
        var req = new Request("read/api/v1.0/tweets/all", {
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
            setRead(data);
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    useEffect(() => {
        readApi();
    }, []);

    return (
        <>
            <h1>All tweets</h1>
            <TweetList data={read} />
        </>
    );
}
