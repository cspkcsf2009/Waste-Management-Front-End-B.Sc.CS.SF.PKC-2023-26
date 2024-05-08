import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Menubar() {
  const logout = useLogout();
  const [isAdmin, setIsAdmin] = useState(false);
  const token = sessionStorage.getItem("token");

  var decoded = jwtDecode(token);


  // Use the `useEffect` hook to update isAdmin based on token changes
  useEffect(() => {
    // Check if token exists before decoding
    if (token) {
      setIsAdmin(decoded.role === "admin");
    }
  }, [token]);

  // Simplify the rendering of the Navbar
  const renderNavbar = (links) => (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container id="menubarCTN">

        <Nav style={{ fontSize: '1.3rem' }}>{links}</Nav>
        <h4 style={{ textTransform: 'capitalize' }}>{`${decoded.role} : ${decoded.firstName}`}</h4>
        <Button style={{ fontSize: '1.3rem' }} variant="danger" onClick={logout}>
          Logout
        </Button>

      </Container>
    </Navbar>
  );

  // Render links based on user role
  const links = isAdmin ? (
    <>
      <a href="/dashboard" style={{ textDecoration: 'none' }}>
        <Navbar.Brand style={{ fontSize: '2rem' }}>
          Waste Management System
        </Navbar.Brand>
      </a>

      <Link to="/dashboard" className="nav-link">
        Dashboard
      </Link>

      <Link to="/create-user" className="nav-link">
        Create User
      </Link>

      <Link to="/users/bins" className="nav-link">
        Lists Bins
      </Link>

      <Link to="/users/create-bin" className="nav-link">
        Create Bin
      </Link>
    </>
  ) : (
    <>
      <Navbar.Brand style={{ fontSize: '2rem' }}>
        Waste Management System
      </Navbar.Brand>
    </>
  );

  return <>{renderNavbar(links)}</>
}

export default Menubar;
