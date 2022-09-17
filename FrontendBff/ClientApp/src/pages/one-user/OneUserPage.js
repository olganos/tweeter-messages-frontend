import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import TweetList from '../../components/tweets/TweetList';
import { getUserTweets } from '../../services/tweets-service';

export default function OneUserPage() {
    const { userName } = useParams();

    const dispatch = useDispatch();
    const userTweets = useSelector((state) => state.tweets.userTweets);
    const allUserTweetsQuantity = useSelector((state) => state.tweets.allUserTweetsQuantity);

    useEffect(() => { dispatch(getUserTweets(userName)); }, []);

    return (
        <>
            <h1>@{userName}'s {allUserTweetsQuantity} tweets</h1>
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
