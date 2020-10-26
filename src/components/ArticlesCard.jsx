import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ArticlesCard = ({ article }) => {
  return (
    <Card>
      <Card.Content as={Link} to={`/articles/${article.id}`}>
        <Card.Header data-cy="title">{article.title}</Card.Header>
        {article.image && <Image data-cy="image" src={article.image} />}
        <Card.Description data-cy="teaser">{article.teaser}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ArticlesCard;
