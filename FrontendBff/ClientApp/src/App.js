import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import './custom.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            //<Layout>
            //  <Routes>
            //    {AppRoutes.map((route, index) => {
            //      const { element, ...rest } = route;
            //      return <Route key={index} {...rest} element={element} />;
            //    })}
            //  </Routes>
            //</Layout>
            <QueryClientProvider client={new QueryClient()}>
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
                </Layout>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    }
}
