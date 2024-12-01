import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Reemplaza useHistory con useNavigate

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  const predefinedPassword = "holasoydiegovalu";

  const handleKey = (e) => {
    e.preventDefault();

    if (password === predefinedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("EncryptionKey", password);
      navigate("/"); // Redirige a la ruta raíz
    } else {
      setError("Error in key");
    }
  };


  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", padding: "20px" }}>
      <h2>Key Capture</h2>
      <form onSubmit={handleKey}>
        <div>
          <label htmlFor="password">Decryption Key:</label> {/* Asocia el label con el input */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Proceder a la app</button>
      </form>
    </div>
  );
};

export default Login;
