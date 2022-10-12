import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardTitle, CardText } from 'reactstrap';

import NavMenu from '../header/NavMenu';

export function Layout() {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loginUrl = useSelector((state) => state.auth.loginUrl);

  return (
    <>
      {
        isLoggedin ? (
          <>
            <NavMenu />
            <main className="px-4">
              <Outlet />
            </main>
          </>
        ) : (
          <div className="d-flex justify-content-center pt-3">
            <div>
              <Card
                body
                  className="text-center"
                style={{
                  width: '18rem'
                }}
              >
                <CardText>
                  Log in to be able to read and post tweets
                </CardText>
                <a
                  href={loginUrl}
                  className="btn btn-primary" role="button"
                >
                  Login
                </a>
              </Card>
            </div>
          </div>
        )
      }
    </>
  )
}
