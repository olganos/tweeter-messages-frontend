import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TweetList from '../../components/tweets/TweetList';
import { useAuthUser } from '../../services/authService';
import { getUserTweets } from '../../services/tweets-service';

export default function Index() {
    // todo: take username from the global state
    const { username, isLoading } = useAuthUser();

    const dispatch = useDispatch();
    const userTweets = useSelector((state) => state.tweets.userTweets);
    const userTweetsQuantity = useSelector((state) => state.tweets.userTweetsQuantity);

    useEffect(() => { dispatch(getUserTweets(username)); }, [username]);


    if (isLoading)
        return <div>Loading...</div>

    return (
        <>
            <h1>Your {userTweetsQuantity} tweets</h1>
            <Row>
                <Col>
                    <div className="mb-2">
                        {/* <CreateTweetForm /> */}
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
