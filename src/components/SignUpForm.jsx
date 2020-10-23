import React, { useState } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import { auth } from "../modules/auth";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [failureMessage, setFailureMessage] = useState("");
  const history = useHistory();

  const signUp = async (event, history) => {
    event.preventDefault();
    try {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const password_confirmation = event.target.passwordConfirmation.value;

      const response = await auth.signUp({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      });
      history.replace("/login", { message: response.data.status });
    } catch (error) {
      setFailureMessage(error.response.data.errors.full_messages[0]);
    }
  };

  return (
    <Container>
      <Form data-cy="sign-up-form" onSubmit={(event) => signUp(event, history)}>
        <Form.Input
          icon="name"
          iconPosition="left"
          label="Name:"
          placeholder="name"
          name="name"
          type="name"
          id="name"
          data-cy="name"
        />
        <Form.Input
          icon="user"
          iconPosition="left"
          label="Email:"
          placeholder="email"
          name="email"
          type="email"
          id="email"
          data-cy="email"
        />

        <Form.Input
          icon="lock"
          iconPosition="left"
          placeholder="password"
          label="Password:"
          type="password"
          name="password"
          id="password"
          data-cy="password"
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          placeholder="password-confirmation"
          label="Password confirmation:"
          type="password"
          name="password-confirmation"
          id="passwordConfirmation"
          data-cy="password-confirmation"
        />
        <Button data-cy="submit" id="Submit" content="Submit" primary />
      </Form>
      {failureMessage && (
        <Message negative>
          <Message.Header data-cy="message">{failureMessage}</Message.Header>
        </Message>
      )}
    </Container>
  );
};

export default SignUpForm;
