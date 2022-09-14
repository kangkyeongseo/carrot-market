import React, { useState } from "react";

export default function Forms() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onUsernameChange = (evnet: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = evnet;
    setUsername(value);
  };
  const onEmailChange = (evnet: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = evnet;
    setEmail(value);
  };
  const onPasswordChange = (evnet: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = evnet;
    setPassword(value);
  };
  const onSubmit = (evnet: React.SyntheticEvent<HTMLFormElement>) => {
    event?.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={username}
        onChange={onUsernameChange}
        type="text"
        placeholder="Username"
        required
        minLength={5}
      />
      <input
        value={email}
        onChange={onEmailChange}
        type="email"
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={onPasswordChange}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
