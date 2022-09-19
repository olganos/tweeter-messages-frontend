import { authActions } from '../store/auth-slice';

export const getCredentials = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('/bff/user', {
                headers: new Headers({
                    "X-CSRF": "1",
                }),
            });

            if (!response.ok) {
                throw new Error('Could not authenticate the user!');
            }

            if (response.status === 200) {
                const data = await response.json();
                return data;
            }

            return null;
        };

        try {
            dispatch(authActions.setUserInfoLoading({ isLoading: true }));
            const authData = await fetchData();
            dispatch(authActions.authenticate({ claims: authData }));
        } catch (error) {
            //todo: show error
        }
        finally {
            dispatch(authActions.setUserInfoLoading({ isLoading: false }));
        }
    }
}
