import React, { useEffect } from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TweetList from '../../components/tweets/TweetList';
import { getUserTweets } from '../../services/tweets-service';
import CreateTweetForm from '../../components/tweets/CreateTweetForm';

export default function Index() {
    const userName = useSelector((state) => state.auth.userName);
    const isLoading = useSelector((state) => state.auth.userInfoLoading);

    const dispatch = useDispatch();
    const userTweets = useSelector((state) => state.tweets.userTweets);
    const userTweetsQuantity = useSelector((state) => state.tweets.userTweetsQuantity);

    useEffect(() => { dispatch(getUserTweets(userName)); }, [userName]);

    if (isLoading)
        return <div>Loading...</div>

    return (
        <>
            <h1>Your {userTweetsQuantity} tweets</h1>
            <Row>
                <Col>
                    <div className="mb-2">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Add your tweet
                                </CardTitle>
                                <CreateTweetForm />
                            </CardBody>
                        </Card>
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
