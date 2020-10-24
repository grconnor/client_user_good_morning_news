import React, { useEffect } from "react";
import ArticlesList from "./components/ArticlesList";
import { Switch, Route } from "react-router-dom";
import SpecificArticle from "./components/SpecificArticle";
import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BecomeSubscriber from "./components/BecomeSubscriber";
import { persistLogin } from "./modules/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    persistLogin(dispatch);

    const getCurrentPosition = async () => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const country = await getCountry(
          pos.coords.latitude,
          pos.coords.longitude
        );
        dispatch({
          type: "SET_LOCATION",
          payload: {
            country: country,
          },
        });
      });
    };
    const getCountry = async (latitude, longitude) => {
      const apiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;

      const result = await axios.get(
        `http://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&language=en&key=${apiKey}`
      );
      return result.data.results[0].components.country;
    };
    getCurrentPosition();
  }, []);

  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/articles/:id" component={SpecificArticle} />
        <Route exact path="/category/:category" component={ArticlesList} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/sign_up" component={SignUpForm} />

        <ProtectedRoutes path="/become-subscriber">
          <BecomeSubscriber />
        </ProtectedRoutes>

        <Route exact path="/" component={ArticlesList} />
      </Switch>
    </>
  );
};
export default App;
