import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Iniciar sesión</h1>

        <input
          type="email"
          className="login__input"
          placeholder="Correo electrónico"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <input
          type="password"
          className="login__input"
          placeholder="Contraseña"
          name="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit" className="login__submit-button">
          Iniciar sesión
        </button>
      </form>
      <Link to="/signup" className="login__link">
        ¿Aún no eres miembro? Regístrate aquí
      </Link>
    </main>
  );
}
