import ArticlesCard from "./ArticlesCard";
import React, { useState, useEffect } from "react";
import Articles from "../modules/articles";
import { Grid, Container, Message } from "semantic-ui-react";
import { useParams, useLocation } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const { category, local } = useParams();
  let location = useLocation();
  const [message, setMessage] = useState();

  useEffect(() => {
    const getArticles = async () => {
      const response = await Articles.index(category, local);
      if (response?.constructor === Array) {
        setArticles(response);
        setErrorMessage("");
      } else {
        setArticles([]);
        setErrorMessage(response);
      }
    };
    getArticles();
  }, [category, local]);

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
    }
  }, [location]);

  return (
    <>
      {message && (
        <Message positive data-cy="payment-success-message">
          <Message.Header>{message}</Message.Header>
        </Message>
      )}
      {errorMessage && (
        <Message negative data-cy="error-message">
          <Message.Header>{errorMessage}</Message.Header>
        </Message>
      )}
      <Container id="container">
        <Grid>
          <Grid.Row columns={3}>
            {articles.map((article) => {
              return (
                <div data-cy={"article-" + article.id} key={article.id}>
                  <ArticlesCard article={article} />
                </div>
              );
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};
export default ArticlesList;
