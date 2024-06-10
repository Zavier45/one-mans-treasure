import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  NavBar,
  NavBarBrand,
  NavBarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = React.useState(false);
  const toggleNavBar = () => setOpen(!open);

  return (
    <div>
      <NavBar color="light" light fixed="true" expand="lg">
        <NavBarBrand className="mr-auto" tag={RRNavLink} to="/">
          One Man's Treasure
        </NavBarBrand>
        {loggedInUser ? (
          <>
            <NavBarToggler onClick={toggleNavBar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar></Nav>
            </Collapse>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </NavBar>
    </div>
  );
}
