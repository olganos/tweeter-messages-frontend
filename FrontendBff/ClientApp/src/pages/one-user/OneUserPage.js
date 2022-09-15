import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import TweetList from '../../components/tweets/TweetList';

export default function OneUserPage() {
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
            <h1>@{userName}'s {userTweets.length} tweets</h1>
            <Row>
                <Col>
                    <TweetList
                        data={userTweets}
                        showUserUri={true}
                    />
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
}
