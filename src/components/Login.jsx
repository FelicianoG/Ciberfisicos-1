import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Reemplaza useHistory con useNavigate

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  const predefinedUsername = "admin";
  const predefinedPassword = "password123";

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (username === predefinedUsername && password === predefinedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/"); // Redirige a la ruta raíz
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };
  

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label> {/* Asocia el label con el input */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label> {/* Asocia el label con el input */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
