import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import './custom.scss';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import AllUsersPage from './pages/all-users/AllUsersPage';
import AllTweetsPage from './pages/all-tweets/AllTweetsPage';
import OneTweetPage from './pages/one-tweet/OneTweetPage';
import OneUserPage from './pages/one-user/OneUserPage';
import SearchUsersPage from './pages/search-users/SearchUsersPage';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <QueryClientProvider client={new QueryClient()}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<div>Hello</div>} />
                        <Route path="/all-users" element={<AllUsersPage />} />
                        <Route path="/all-users/:userName" element={<OneUserPage />} />
                        <Route path="/search-users/:userName" element={<SearchUsersPage />} />
                        <Route path="/all-tweets" element={<AllTweetsPage />}>
                            {/* todo: maybe not create a separate page, but show one tweet on the right.
                            in this case I'll need the nested rout and outlet inside AllTweets */}
                            {/* <Route path=":tweetId" element={<OneTweet />} /> */}
                        </Route>
                        <Route path="/all-tweets/:tweetId" element={<OneTweetPage />} />
                    </Route>
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    }
}
