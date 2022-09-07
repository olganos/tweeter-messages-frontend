import React from 'react';
import useClaims from '../services/claimsService';

function Home() {
    const { data: claims, isLoading } = useClaims();
    let logoutUrl = claims?.find(claim => claim.type === 'bff:logout_url')
    let nameDict = claims?.find(claim => claim.type === 'name') || claims?.find(claim => claim.type === 'sub');
    let username = nameDict?.value;

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div className="p-20">
            {
                !username ? (
                    <a
                        href="/bff/login"
                    >
                        Login
                    </a>
                ) : (
                    <div className="flex-shrink-0 block">
                        <div className="flex items-center">
                            <div className="ml-3">
                                <p>{`Hi, ${username}!`}</p>
                                <a
                                    href={logoutUrl?.value}
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export { Home };

//import React, { Component } from 'react';

//export class Home extends Component {
//    static displayName = Home.name;

//    render() {
//        return (
//            <div>
//                <h1>Hello, world!</h1>
//                <a
//                    href="/bff/login?returnUrl=/" >
//                    Login
//                </a>
//                <p>Welcome to your new single-page application, built with:</p>
//                <ul>
//                    <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
//                    <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
//                    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
//                </ul>
//                <p>To help you get started, we have also set up:</p>
//                <ul>
//                    <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
//                    <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
//                    <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
//                </ul>
//                <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
//            </div>
//        );
//    }
//}
