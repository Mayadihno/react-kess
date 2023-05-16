import { Button } from "@chakra-ui/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Config";

const Menubar = () => {
  const [pageState, setPageState] = useState(false);
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email === "odehbrainard@gmail.com";
        setAdmin(userEmail);
        setPageState(true);
      } else {
        setPageState(false);
      }
    });
  }, [pageState]);
  return (
    <>
      {!pageState && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/our-sport"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Our Sports
          </NavLink>
          <NavLink
            to="/trending-news"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Trending News
          </NavLink>

          <Button
            color={"twitter"}
            variant={"outline"}
            onClick={() => navigate("/create-account")}
          >
            Sign up
          </Button>
        </>
      )}
      {pageState && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/our-sport"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Our Sports
          </NavLink>
          <NavLink
            to="/trending-news"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Trending News
          </NavLink>
          <NavLink
            to="/fixturesRoute"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Fixtures
          </NavLink>
          <NavLink
            to="/photo-gallery"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Photo Gallery
          </NavLink>
          <NavLink
            to="/videos-gallery"
            className={({ isActive }) => (isActive ? "active-links" : "")}
          >
            Highlights
          </NavLink>
          {admin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active-links" : "")}
            >
              Admin Page
            </NavLink>
          )}

          <Button
            variant={"outline"}
            colorScheme="messenger"
            onClick={handleClick}
          >
            Logout
          </Button>
        </>
      )}
    </>
  );
};

export default Menubar;
