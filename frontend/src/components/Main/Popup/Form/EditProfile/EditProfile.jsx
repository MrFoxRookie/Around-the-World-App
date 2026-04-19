import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      action="#"
      className="popup-profile__container form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <div className="form__field">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            type="text"
            placeholder="Nombre"
            className="form__input"
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={40}
            value={name}
            onChange={handleNameChange}
          />
          <span id="name-error" className="form__error input-span"></span>
        </div>
        <div className="form__field">
          <label htmlFor="description" className="form__label">
            Acerca de mí
          </label>
          <input
            type="text"
            placeholder="Acerca de mí"
            className="form__input"
            id="description"
            name="description"
            required
            minLength={2}
            maxLength={200}
            value={description}
            onChange={handleDescriptionChange}
          />
          <span
            id="description-error"
            className="form__error input-span"
          ></span>
        </div>
      </fieldset>

      <button
        type="submit"
        className="form__submit-button popup-profile__save-button"
      >
        Guardar
      </button>
    </form>
  );
}
