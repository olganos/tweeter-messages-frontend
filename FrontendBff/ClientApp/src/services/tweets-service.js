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