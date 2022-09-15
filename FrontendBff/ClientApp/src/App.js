import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import './custom.scss';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import AllUsersPage from './pages/all-users/AllUsersPage';
import AllTweetsPage from './pages/all-tweets/AllTweetsPage';
import OneUserPage from './pages/one-user/OneUserPage';
import SearchUsersPage from './pages/search-users/SearchUsersPage';
import TweetFullView from './components/tweets/TweetFullView';
import Index from './pages/index/Index';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <QueryClientProvider client={new QueryClient()}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Index />} />
                        <Route path="/all-users" element={<AllUsersPage />} />
                        <Route path="/all-users/:userName" element={<OneUserPage />}>
                            <Route path=":tweetId" element={<TweetFullView />} />
                        </Route>
                        <Route path="/search-users/:userName" element={<SearchUsersPage />} />
                        <Route path="/all-tweets" element={<AllTweetsPage />}>
                            <Route path=":tweetId" element={<TweetFullView />} />
                        </Route>
                    </Route>
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    }
}
