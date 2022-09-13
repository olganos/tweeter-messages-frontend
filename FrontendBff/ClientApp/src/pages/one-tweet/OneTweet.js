import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Tweet from '../../components/tweets/Tweet';

export default function OneTweet() {
    const { tweetId } = useParams();
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
            setRead(data.find(item => item.id === tweetId));
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    useEffect(() => {
        readApi();
    }, []);

    return (
        <>
            <Tweet data={read} />
        </>
    );
}
