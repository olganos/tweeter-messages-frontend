import { tweetsActions } from '../store/tweets-slice';

export const getAllTweets = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("read/api/v1.0/tweets/all", {
                headers: new Headers({
                    "X-CSRF": "1",
                }),
            });

            if (!response.ok) {
                throw new Error('Could not fetch tweets!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const tweetsData = await fetchData();
            dispatch(tweetsActions.renewAllTweets({ tweets: tweetsData }));
        } catch (error) {
            //todo: show error
            // dispatch(
            //     uiActions.showNotification({
            //         status: 'error',
            //         title: 'Error!',
            //         message: 'Fetching cart data failed!',
            //     })
            // );
        }
    }
}

export const getAllUsers = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("read/api/v1.0/tweets/users/all", {
                headers: new Headers({
                    "X-CSRF": "1",
                }),
            });

            if (!response.ok) {
                throw new Error('Could not fetch users!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const usersData = await fetchData();
            dispatch(tweetsActions.renewAllUsers({ users: usersData }));
        } catch (error) {
            //todo: show error
        }
    }
}

export const searchByUser = (userName) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`read/api/v1.0/tweets/user/search/${userName}`, {
                headers: new Headers({
                    "X-CSRF": "1",
                }),
            });

            if (!response.ok) {
                throw new Error('Could not fetch users!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const usersData = await fetchData();
            dispatch(tweetsActions.renewAllUsers({ users: usersData }));
        } catch (error) {
            //todo: show error
        }
    }
}

export const getUserTweets = (userName) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`read/api/v1.0/tweets/${userName}`, {
                headers: new Headers({
                    "X-CSRF": "1",
                }),
            });

            if (!response.ok) {
                throw new Error('Could not fetch tweets!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const tweetsData = await fetchData();
            dispatch(tweetsActions.renewUserTweets({ tweets: tweetsData }));
        } catch (error) {
            //todo: show error
        }
    }
}

export const createTweet = (newTweet, userName, successFunction) => {
    return async (dispatch) => {
        const callApi = async () => {
            const response = await fetch(`write/api/v1.0/tweets/${userName}/add`, {
                method: 'POST',
                body: JSON.stringify({
                    text: newTweet.text,
                    tag: newTweet.tag
                }),
                headers: new Headers({
                    "X-CSRF": "1",
                    'Content-Type': 'application/json',
                }),
            });

            if (!response.ok) {
                throw new Error('Could not create new tweet!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const tweetsData = await callApi();
            dispatch(tweetsActions.addTweet({ tweet: tweetsData }));
            successFunction();
        } catch (error) {
            //todo: show error
        }
    }
}

export const editTweet = (editedTweet, userName, tweetId, successFunction) => {
    return async (dispatch) => {
        const callApi = async () => {
            const response = await fetch(`write/api/v1.0/tweets/${userName}/update/${tweetId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    text: editedTweet.text
                }),
                headers: new Headers({
                    "X-CSRF": "1",
                    'Content-Type': 'application/json',
                }),
            });

            if (!response.ok) {
                throw new Error('Could not update the tweet!');
            }
        };

        try {
            await callApi();
            dispatch(tweetsActions.editTweet({
                tweet: {
                    text: editedTweet.text,
                    id: tweetId,
                }
            }));
            successFunction();
        } catch (error) {
            //todo: show error
        }
    }
}

export const deleteTweet = (userName, tweetId, successFunction) => {
    return async (dispatch) => {
        const callApi = async () => {
            const response = await fetch(`write/api/v1.0/tweets/${userName}/delete/${tweetId}`, {
                method: 'DELETE',
                headers: new Headers({
                    "X-CSRF": "1",
                }),
            });

            if (!response.ok) {
                throw new Error('Could not delete the tweet!');
            }
        };

        try {
            await callApi();
            dispatch(tweetsActions.deleteTweet({ tweetId }));
            successFunction();
        } catch (error) {
            //todo: show error
        }
    }
}

export const likeTweet = (userName, tweetId) => {
    return async (dispatch) => {
        const callApi = async () => {
            const response = await fetch(`write/api/v1.0/tweets/${userName}/like/${tweetId}`, {
                method: 'PUT',
                headers: new Headers({
                    "X-CSRF": "1",
                    'Content-Type': 'application/json',
                }),
            });

            if (!response.ok) {
                throw new Error('Could not like the tweet!');
            }
        };

        try {
            await callApi();
            dispatch(tweetsActions.likeTweet({ tweetId }));
        } catch (error) {
            //todo: show error
        }
    }
}

export const addReply = (newReply, userName, tweetId, successFunction) => {
    return async (dispatch) => {
        const callApi = async () => {
            const response = await fetch(`write/api/v1.0/tweets/${userName}/reply/${tweetId}`, {
                method: 'POST',
                body: JSON.stringify({
                    text: newReply.text,
                    tag: newReply.tag
                }),
                headers: new Headers({
                    "X-CSRF": "1",
                    'Content-Type': 'application/json',
                }),
            });

            if (!response.ok) {
                throw new Error('Could not add reply!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const replyData = await callApi();
            dispatch(tweetsActions.addReply({ reply: replyData, tweetId }));
            successFunction();
        } catch (error) {
            //todo: show error
        }
    }
}