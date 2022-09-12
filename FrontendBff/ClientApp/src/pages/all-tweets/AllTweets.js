import React, { useState, useEffect } from 'react';

export default function AllTweets() {
    const [read, setRead] = useState([]);
    
    useEffect(() => {
        readApi();
    }, []);

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
            setRead(JSON.stringify(data));
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
            {read}
        </>
    );
}
