import { useState, useContext } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleNameChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <main className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__title">Regístrate</h1>

        <input
          type="email"
          className="register__input"
          placeholder="Correo electrónico"
          name="email"
          required
          value={email}
          onChange={handleNameChange}
        />

        <input
          type="password"
          className="register__input"
          placeholder="Contraseña"
          name="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit" className="register__submit-button">
          Regístrate
        </button>
      </form>
      <Link to="/signin" className="register__link">
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
    </main>
  );
}
