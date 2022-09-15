import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import styles from './NavMenu.module.scss';
import SearchUser from './SearchUser';
import UserInfo from './UserInfo';
import CreateTweetModal from '../modals/CreateTweetModal';

export default function Header() {
  const navActiveStyle = {
    textDecoration: "none",
    color: "black",
    cursor: "default"
  }

  const getNavStyle = ({ isActive }) => {
    return isActive ? navActiveStyle : undefined;
  };

  return (
    <header>
      <Navbar className={`border-bottom ${styles.boxShadow} mb-3`} container light>
        <NavbarBrand tag={Link} to="/">Tweeter</NavbarBrand>
        <CreateTweetModal />
        <SearchUser />
        <Nav className="d-flex flex-row">
          {/* on the main page show user name, user's tweets and a form for a new tweet */}
          {/* if not athenticated, redirect to identity server */}
          <NavItem className="me-3">
            <NavLink
              to="/all-users"
              style={getNavStyle}
              end
            >
              All users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/all-tweets" //todo: Tweets (all, but rectrict somehow - by pages of load dinamically)
              style={getNavStyle}
              end
            >
              All tweets
            </NavLink>
          </NavItem>
        </Nav>
        <UserInfo />
      </Navbar>
    </header >
  );
}