import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ReplyList from './reply/ReplyList';
import CreateReplyForm from './reply/CreateReplyForm';
import EditTweetModal from '../modals/EditTweetModal';
import { TrashIcon } from '@primer/octicons-react'
import { Button } from 'reactstrap';

export default function TweetFullView() {
    const { tweetId } = useParams();
    const [tweet, setTweet] = useState({});

    const onDelete = async () => {
        // todo: show confirmation

        var req = new Request(`write/api/v1.0/tweets/${tweet.userName}/delete/${tweet.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "X-CSRF": "1",
            }),
        });

        try {
            var resp = await fetch(req);

            if (resp.ok) {
                await resp.json();
                // todo: show empty place
            }
        } catch (e) {
            console.log("error calling remote API");
        }
    }

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

            setTweet(data.find(item => item.id === tweetId));
        } catch (e) {
            console.log("error calling remote API");
        }
    }

    useEffect(() => {
        readApi();
    }, [tweetId]);

    if (!tweet) {
        return null;
    }

    return (
        <>
            <div
                className="d-flex justify-content-between"
            >
                @{tweet.userName}
                <div>
                    <EditTweetModal
                        tweet={tweet}
                    />
                    <Button
                        color="primary"
                        outline
                        size="sm"
                        className="me-1"
                        onClick={onDelete}
                    >
                        <TrashIcon size={16} />
                    </Button>
                </div>
            </div>
            <div>
                posted at
                &nbsp;
                <Moment
                    format="DD.MM.YYYY HH:mm:ss"
                >
                    {tweet.created}
                </Moment>
            </div>
            <p>
                {tweet.text}
            </p>
            {tweet.tag &&
                <p>
                    #{tweet.tag}
                </p>
            }
            <div className="mb-2">
                <CreateReplyForm
                    tweetId={tweetId}
                />
            </div>
            {(tweet.replies && tweet.replies.length != 0) &&
                <>
                    <p>
                        Replies:
                    </p>
                    <ReplyList data={tweet.replies} />
                </>
            }
        </>
    )
}