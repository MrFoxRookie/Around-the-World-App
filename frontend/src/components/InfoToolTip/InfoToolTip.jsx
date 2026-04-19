import successImage from "../../images/register-popup__success.svg";
import failureImage from "../../images/register-popup__failure.svg";
import closeButton from "../../images/close-button.svg";

export default function InfoToolTip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="register-popup">
      <div className="register-popup__container">
        <button className="register-popup__close-button" onClick={onClose}>
          <img src={closeButton} alt="Cerrar" />
        </button>
        <img
          src={isSuccess ? successImage : failureImage}
          alt={
            isSuccess
              ? "Imagen de registro exitoso"
              : "Imagen de registro fallido"
          }
          className="register-popup__image"
        />
        <p className="register-popup__text">
          {isSuccess
            ? "¡Correcto! Ya estás registrado"
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}
