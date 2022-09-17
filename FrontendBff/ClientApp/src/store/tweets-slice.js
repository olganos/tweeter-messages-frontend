import { createSlice } from '@reduxjs/toolkit';
import { useLinkClickHandler } from 'react-router-dom';

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState: {
        allTweets: [],
        allTweetsQuantity: 0,
        userTweets: [],
        userTweetsQuantity: 0,
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
            state.userTweetsQuantity = action.payload.tweets.length;
        },
        addTweet(state, action) {
            const newTweet = action.payload.tweet;
            newTweet.likes = 0;

            state.allTweets = [
                { ...newTweet },
                ...state.allTweets];
            state.allTweetsQuantity++;

            state.userTweets = [
                { ...newTweet },
                ...state.userTweets];
            state.userTweetsQuantity++;
        },
        editTweet(state, action) {
            const editedTweet = action.payload.tweet;

            if (state.oneTweet && state.oneTweet.id === editedTweet.id) {
                state.oneTweet.text = editedTweet.text;
            }

            const oneOfAllTweets = state.allTweets
                .find(tweet => tweet.id === editedTweet.id);

            if (oneOfAllTweets) {
                oneOfAllTweets.text = editedTweet.text;
            }

            const oneOfUserTweets = state.userTweets
                .find(tweet => tweet.id === editedTweet.id);

            if (oneOfUserTweets) {
                oneOfUserTweets.text = editedTweet.text;
            }
        }
    },
});

export const tweetsActions = tweetsSlice.actions;

export default tweetsSlice;
