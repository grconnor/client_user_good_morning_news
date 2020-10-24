import React, { useState, useEffect } from "react";
import { Header, Menu, Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const [activeItem, setActiveItem] = useState("news");
  const authenticated = useSelector((state) => state.authenticated);
  const currentUser = useSelector((state) => state.currentUser);
  const country = useSelector((state) => state.country);

  const handleItemClick = ({ name }) => {
    setActiveItem(name);
  };
  return (
    <Header as="h1" id="header">
      <Grid id="main-grid">
        <Grid.Row columns={4} id="GMN-logo">
          <Grid.Column id="good" width={2} textAlign="right">
            Good
          </Grid.Column>
          <Grid.Column id="morning" width={2} textAlign="center">
            Morning
          </Grid.Column>
          <Grid.Column id="News" width={2} textAlign="left">
            News
          </Grid.Column>
          <Grid.Column id="slogan" width={8} textAlign="right">
            For a great start of the day
          </Grid.Column>
        </Grid.Row>{" "}
      </Grid>
      <Header.Subheader data-cy="navigation-bar">
        <Menu id="menu">
          <Menu.Item
            data-cy="location"
            name="location"
            active={activeItem === "location"}
            onClick={handleItemClick}
          >
            {country}
          </Menu.Item>
          <Menu.Item
            data-cy="home"
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to={{ pathname: "/" }}
          >
            Home
          </Menu.Item>
          <Menu.Item
            data-cy="sports"
            name="sports"
            active={activeItem === "sports"}
            onClick={handleItemClick}
            as={Link}
            to={{ pathname: "/category/sports" }}
          >
            Sports
          </Menu.Item>
          <Menu.Item
            data-cy="business"
            name="business"
            active={activeItem === "business"}
            onClick={handleItemClick}
            as={Link}
            to={{ pathname: "/category/business" }}
          >
            Business
          </Menu.Item>
          <Menu.Item
            data-cy="entertainment"
            name="entertainment"
            active={activeItem === "entertainment"}
            onClick={handleItemClick}
            as={Link}
            to={{ pathname: "/category/entertainment" }}
          >
            Entertainment
          </Menu.Item>
          <Menu.Item
            data-cy="weather"
            name="weather"
            active={activeItem === "weather"}
            onClick={handleItemClick}
            as={Link}
            to={{ pathname: "/category/weather" }}
          >
            Weather
          </Menu.Item>
          <Menu.Item
            data-cy="news"
            name="news"
            active={activeItem === "news"}
            onClick={handleItemClick}
            as={Link}
            to={{ pathname: "/category/news" }}
          >
            International
          </Menu.Item>

          {authenticated ? (
            currentUser.role !== "subscriber" && (
              <Menu.Item
                position="right"
                data-cy="become-subscriber"
                name="become-subscriber"
                active={activeItem === "become-subscriber"}
                as={Link}
                to={{ pathname: "/become-subscriber" }}
                inverted
              >
                Become Subscriber
              </Menu.Item>
            )
          ) : (
            <Menu.Item position="right">
              <Button
                color="black"
                data-cy="login-button"
                name="login"
                active={activeItem === "login"}
                as={Link}
                to={{ pathname: "/login" }}
              >
                Login
              </Button>
              <Menu.Item></Menu.Item>
              <Button
                color="black"
                data-cy="sign-up-button"
                name="sign-up"
                active={activeItem === "sign-up"}
                as={Link}
                to={{ pathname: "/sign_up" }}
              >
                Sign Up
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </Header.Subheader>
    </Header>
  );
};
export default NavigationBar;
