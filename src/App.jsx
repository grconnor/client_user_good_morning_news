import React, { useEffect } from "react";
import ArticlesList from "./components/ArticlesList";
import { Switch, Route } from "react-router-dom";
import SpecificArticle from "./components/SpecificArticle";
import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BecomeSubscriber from "./components/BecomeSubscriber";
import { auth } from "./modules/auth";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const persistLogin = async () => {
      if (localStorage.getItem("J-tockAuth-Storage")) {
        let credentials = JSON.parse(
          localStorage.getItem("J-tockAuth-Storage")
        );
        const response = await auth.validateToken(credentials);

        if (response.success) {
          dispatch({
            type: "AUTHENTICATE",
            payload: {
              authenticated: response.success,
              currentUser: response.data,
            },
          });
        } else {
          console.log(response);
        }
      }
    };
    persistLogin();
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
