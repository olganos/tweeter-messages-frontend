import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import './custom.scss';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import AllUsers from './pages/all-users/AllUsers';
import AllTweets from './pages/all-tweets/AllTweets';
import OneTweet from './pages/one-tweet/OneTweet';
import OneUser from './pages/one-user/OneUser';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <QueryClientProvider client={new QueryClient()}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<div>Hello</div>} />
                        <Route path="/all-users" element={<AllUsers />} />
                        <Route path="/all-users/:userName" element={<OneUser />} />
                        <Route path="/all-tweets" element={<AllTweets />}>
                            {/* todo: maybe not create a separate page, but show one tweet on the right.
                            in this case I'll need the nested rout and outlet inside AllTweets */}
                            {/* <Route path=":tweetId" element={<OneTweet />} /> */}
                        </Route>
                        <Route path="/all-tweets/:tweetId" element={<OneTweet />} />
                    </Route>
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    }
}
