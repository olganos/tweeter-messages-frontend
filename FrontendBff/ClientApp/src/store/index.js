import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';

//import uiSlice from './ui-slice';
import tweetsSlice from './tweets-slice';

const store = configureStore({
    reducer: {
        tweets: tweetsSlice.reducer,
        auth: authSlice.reducer,
    },
});

export default store;