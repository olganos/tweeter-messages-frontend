import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import ReplyList from './reply/ReplyList';
import CreateReplyForm from './reply/CreateReplyForm';
import EditTweetModal from '../modals/EditTweetModal';

export default function TweetFullView() {
    const { tweetId } = useParams();
    const [tweet, setTweet] = useState({});

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