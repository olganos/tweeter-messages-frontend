import { Outlet } from 'react-router-dom';

import NavMenu from '../header/NavMenu';

export function Layout() {
  return (
    <>
      <NavMenu />
      <main className="px-4">
        <Outlet />
      </main>
    </>
  );
}
