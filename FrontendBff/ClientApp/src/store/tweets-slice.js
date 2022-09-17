import { createSlice } from '@reduxjs/toolkit';

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState: {
        allTweets: [],
        allTweetsQuantity: 0,
        userTweets: [],
        allUserTweetsQuantity: 0,
        oneTweet: null,
        allUsers: [],
    },
    reducers: {
        renewAllTweets(state, action) {
            state.allTweets = action.payload.tweets;
            state.allTweetsQuantity = action.payload.tweets.length;
        },
        getOneTweet(state, action) {
            state.oneTweet = action.payload.tweet;
        },
        renewAllUsers(state, action) {
            state.allUsers = action.payload.users;
        },
        renewUserTweets(state, action) {
            state.userTweets = action.payload.tweets;
            state.allUserTweetsQuantity = action.payload.tweets.length;
        },
        // replaceCart(state, action) {
        //     state.totalQuantity = action.payload.totalQuantity;
        //     state.items = action.payload.items;
        // },
        // addItemToCart(state, action) {
        //     const newItem = action.payload;
        //     const existingItem = state.items.find((item) => item.id === newItem.id);
        //     state.totalQuantity++;
        //     state.changed = true;
        //     if (!existingItem) {
        //         state.items.push({
        //             id: newItem.id,
        //             price: newItem.price,
        //             quantity: 1,
        //             totalPrice: newItem.price,
        //             name: newItem.title,
        //         });
        //     } else {
        //         existingItem.quantity++;
        //         existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        //     }
        // },
        // removeItemFromCart(state, action) {
        //     const id = action.payload;
        //     const existingItem = state.items.find((item) => item.id === id);
        //     state.totalQuantity--;
        //     state.changed = true;
        //     if (existingItem.quantity === 1) {
        //         state.items = state.items.filter((item) => item.id !== id);
        //     } else {
        //         existingItem.quantity--;
        //         existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        //     }
        // },
    },
});

export const tweetsActions = tweetsSlice.actions;

export default tweetsSlice;
