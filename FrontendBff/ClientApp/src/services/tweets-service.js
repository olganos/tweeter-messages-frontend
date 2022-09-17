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
        const fetchData = async () => {
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
            const tweetsData = await fetchData();
            dispatch(tweetsActions.addTweet({ tweet: tweetsData }));
            successFunction();
        } catch (error) {
            //todo: show error
        }
    }
}