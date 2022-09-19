import { createSlice } from '@reduxjs/toolkit';

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
        },
        deleteTweet(state, action) {
            const tweetId = action.payload.tweetId;

            state.allTweets = state.allTweets.filter(tweet => tweet.id !== tweetId);
            state.allTweetsQuantity--;

            state.userTweets = state.userTweets.filter(tweet => tweet.id !== tweetId);
            state.userTweetsQuantity--;

            if (state.oneTweet && state.oneTweet.id === tweetId) {
                state.oneTweet = null;
            }
        },
        likeTweet(state, action) {
            const tweetId = action.payload.tweetId;

            const oneOfAllTweets = state.allTweets
                .find(tweet => tweet.id === tweetId);

            if (oneOfAllTweets) {
                oneOfAllTweets.likes++;
            }

            const oneOfUserTweets = state.userTweets
                .find(tweet => tweet.id === tweetId);

            if (oneOfUserTweets) {
                oneOfUserTweets.likes++;
            }
        },
        addReply(state, action) {
            const newReply = action.payload.reply;
            const tweetId = action.payload.tweetId;

            if (state.oneTweet && state.oneTweet.id === tweetId) {
                state.oneTweet.replies = [
                    { ...newReply },
                    ...state.oneTweet.replies];
            }

            const oneOfAllTweets = state.allTweets
                .find(tweet => tweet.id === tweetId);

            if (oneOfAllTweets) {
                oneOfAllTweets.replies = [
                    { ...newReply },
                    ...oneOfAllTweets.replies];
            }

            const oneOfUserTweets = state.userTweets
                .find(tweet => tweet.id === tweetId);

            if (oneOfUserTweets) {
                oneOfUserTweets.replies = [
                    { ...newReply },
                    ...oneOfUserTweets.replies];
            }
        },
    },
});

export const tweetsActions = tweetsSlice.actions;

export default tweetsSlice;
