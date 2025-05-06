import { useState } from "react";
import { Navigate } from "react-router-dom";

import { handleLogin } from "../api/auth";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = await handleLogin({ username, password });

    if (authToken) login(authToken);
    else setError("Incorrect username or password");
  };

  return (
    <div>
      <div>Title</div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Username:</div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="username"
            value={username}
            maxLength={16}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? (
          <div>{error}</div>
        ) : (
          <div>{"Demo Login: Username: admin{number} Password: admin"}</div>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
