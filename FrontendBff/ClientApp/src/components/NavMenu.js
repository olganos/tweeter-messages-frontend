import { NavLink, Link } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import './NavMenu.css';
import UserInfo from './UserInfo';

export default function Header() {
  return (
    <header>
      <Navbar className="border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">Tweeter</NavbarBrand>

        {/* on the main page show user name, user's tweets and a form for a new tweet */}
        {/* if not athenticated, redirect to identity server */}

        <NavLink
          to="/all-users"
        >
          All users
        </NavLink>
        {/* |
        <NavLink
          to="/page3" Tweets (all, but rectric somehow - by pages of load dinamically)
        >
          Page 3
        </NavLink> */}
        <UserInfo />
      </Navbar>
    </header>
  );
}