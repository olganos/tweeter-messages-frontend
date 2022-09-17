import { configureStore } from '@reduxjs/toolkit';

//import uiSlice from './ui-slice';
import tweetsSlice from './tweets-slice';

const store = configureStore({
    // reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
    reducer: { tweets: tweetsSlice.reducer },
});

export default store;