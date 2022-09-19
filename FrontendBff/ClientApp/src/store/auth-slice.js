import { createSlice } from '@reduxjs/toolkit';

const LOGGOUT_URL = '/bff/logout';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfoLoading: false,
        userName: '',
        isLoggedin: false,
        claims: [],
        logoutUrl: LOGGOUT_URL,
    },
    reducers: {
        authenticate(state, action) {
            const claims = action.payload.claims ?? [];
            if (!claims) {
                state.userName = '';
                state.isLoggedin = false;
                state.claims = [];
                state.logoutUrl = LOGGOUT_URL;
            }
            else {
                const userName = claims.find((claim) => claim.type === 'name')?.value;
                state.userName = userName;
                state.isLoggedin = !!userName;
                state.claims = claims;
                state.logoutUrl = claims.find((claim) => claim.type === 'bff:logout_url')
                    ?.value ?? LOGGOUT_URL;
            }
        },
        setUserInfoLoading(state, action) {
            state.userInfoLoading = action.payload.isLoading;
        }
    },
});

export const authActions = authSlice.actions;

export default authSlice;
