import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import TweetList from '../../components/tweets/TweetList';
//import { tweetsActions } from '../../store/tweets-slice';
import { getAllTweets } from '../../services/tweets-service';

export default function AllTweetsPage() {
    const dispatch = useDispatch();
    const allTweets = useSelector((state) => state.tweets.allTweets);
    const allTweetsQuantity = useSelector((state) => state.tweets.allTweetsQuantity);

    useEffect(() => { dispatch(getAllTweets()); }, []);

    return (
        <>
            <h1>All {allTweetsQuantity} tweets</h1>
            <Row>
                <Col>
                    <TweetList data={allTweets} />
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
}
