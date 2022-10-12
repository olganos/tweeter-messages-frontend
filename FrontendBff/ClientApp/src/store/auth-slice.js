import { createSlice } from '@reduxjs/toolkit';

const LOGOUT_URL = '/bff/logout';
const LOGIN_URL = '/bff/login';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfoLoading: false,
        userName: '',
        isLoggedin: false,
        claims: [],
        logoutUrl: LOGOUT_URL,
        loginUrl: LOGIN_URL
    },
    reducers: {
        authenticate(state, action) {
            const claims = action.payload.claims ?? [];
            if (!claims) {
                state.userName = '';
                state.isLoggedin = false;
                state.claims = [];
                state.logoutUrl = LOGOUT_URL;
            }
            else {
                const userName = claims.find((claim) => claim.type === 'name')?.value;
                state.userName = userName;
                state.isLoggedin = !!userName;
                state.claims = claims;
                state.logoutUrl = claims.find((claim) => claim.type === 'bff:logout_url')
                    ?.value ?? LOGOUT_URL;
            }
        },
        setUserInfoLoading(state, action) {
            state.userInfoLoading = action.payload.isLoading;
        }
    },
});

export const authActions = authSlice.actions;

export default authSlice;
