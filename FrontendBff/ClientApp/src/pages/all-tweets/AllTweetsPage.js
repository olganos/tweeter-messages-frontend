import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import TweetList from '../../components/tweets/TweetList';
import CreateTweetForm from '../../components/tweets/CreateTweetForm';

export default function AllTweetsPage() {
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
            <Row>
                <Col>
                    <p>
                        <CreateTweetForm />
                    </p>
                    <TweetList data={read} />
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
}
