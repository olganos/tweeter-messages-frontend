import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import ReplyList from './reply/ReplyList';
import CreateReplyForm from './reply/CreateReplyForm';
import EditTweetModal from '../modals/EditTweetModal';
import DeleteTweet from './DeleteTweet';
import { tweetsActions } from '../../store/tweets-slice';
import { getAllTweets } from '../../services/tweets-service';

export default function TweetFullView() {
    const { tweetId } = useParams();
    const dispatch = useDispatch();
    const oneTweet = useSelector((state) => state.tweets.oneTweet);
    const allTweets = useSelector((state) => state.tweets.allTweets);
    const allTweetsQuantity = useSelector((state) => state.tweets.allTweetsQuantity);

    useEffect(() => {
        if (!tweetId) {
            return;
        }
        if (allTweetsQuantity === 0) {
            dispatch(getAllTweets());
        }
        else {
            const tweet = allTweets.find(tweet => tweet.id === tweetId);
            dispatch(tweetsActions.getOneTweet({ tweet }));
        }
    }, [tweetId, allTweets]);

    if (!oneTweet) {
        return null;
    }

    return (
        <>
            <div
                className="d-flex justify-content-between"
            >
                @{oneTweet.userName}
                <div>
                    <EditTweetModal
                        tweet={oneTweet}
                    />
                    <DeleteTweet
                        tweetId={oneTweet.id}
                        userName={oneTweet.userName}
                    />
                </div>
            </div>
            <div>
                posted at
                &nbsp;
                <Moment
                    format="DD.MM.YYYY HH:mm:ss"
                >
                    {oneTweet.created}
                </Moment>
            </div>
            <p>
                {oneTweet.text}
            </p>
            {oneTweet.tag &&
                <p>
                    #{oneTweet.tag}
                </p>
            }
            <div className="mb-2">
                <CreateReplyForm
                    tweetId={tweetId}
                />
            </div>
            {(oneTweet.replies && oneTweet.replies.length != 0) &&
                <>
                    <p>
                        Replies:
                    </p>
                    <ReplyList data={oneTweet.replies} />
                </>
            }
        </>
    )
}