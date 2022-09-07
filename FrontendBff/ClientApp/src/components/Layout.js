import { Outlet } from 'react-router-dom';

import NavMenu from './NavMenu';

export function Layout() {
  return (
    <>
      <NavMenu />
      <main>
        <Outlet />
      </main>
    </>
  );
}
