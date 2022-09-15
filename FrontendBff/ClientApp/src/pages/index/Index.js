import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import CreateTweetForm from '../../components/tweets/CreateTweetForm';
import TweetList from '../../components/tweets/TweetList';
import { useAuthUser } from '../../services/authService';

export default function Index() {
    // todo: take username from the global state
    const { username, isLoading } = useAuthUser();
    const [userTweets, setUserTweets] = useState([]);

    const readApi = async () => {
        var req = new Request(`read/api/v1.0/tweets/${username}`, {
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
            setUserTweets(data);
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    useEffect(() => {
        readApi();
    }, [username]);


    if (isLoading)
        return <div>Loading...</div>

    return (
        <>
            <h1>Your {userTweets.length} tweets</h1>
            <Row>
                <Col>
                    <div className="mb-2">
                        <CreateTweetForm />
                    </div>
                    <TweetList
                        data={userTweets}
                        showUserUri={true}
                    />
                </Col>
            </Row>
        </>
    );
}
