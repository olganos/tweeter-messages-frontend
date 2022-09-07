import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import AllUsers from './pages/all-users/AllUsers';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <QueryClientProvider client={new QueryClient()}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<div>Hello</div>} />
                        <Route path="/all-users" element={<AllUsers />} />
                    </Route>
                    {/* <Route element={<Layout2 />}>
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
      </Route> */}
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    }
}
