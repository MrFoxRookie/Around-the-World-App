import { useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const { onAddPlaceSubmit } = props;

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({ name, link });
    setName("");
    setLink("");
  }

  return (
    <form
      action="#"
      className="popup-image__container form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <div className="form__field">
          <label htmlFor="card-title" className="form__label">
            Título
          </label>
          <input
            type="text"
            placeholder="Título"
            className="form__input"
            id="card-title"
            name="name"
            required
            minLength={2}
            maxLength={30}
            value={name}
            onChange={handleNameChange}
          />
          <span id="card-title-error" className="form__error input-span"></span>
        </div>
        <div className="form__field">
          <label htmlFor="image-url" className="form__label">
            URL de la imagen
          </label>
          <input
            type="url"
            placeholder="Enlace a la imagen"
            className="form__input"
            id="image-url"
            name="link"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span id="image-url-error" className="form__error input-span"></span>
        </div>
      </fieldset>

      <button
        type="submit"
        className="form__submit-button popup-image__submit-button"
      >
        Crear
      </button>
    </form>
  );
}
