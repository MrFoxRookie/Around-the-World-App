import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef(null);
  const userContext = useContext(CurrentUserContext);

  const { handleUpdateAvatar } = userContext;

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      action="#"
      className="popup-avatar__container form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <div className="form__field">
          <label htmlFor="avatar-link" className="form__label">
            Enlace del avatar
          </label>
          <input
            type="url"
            placeholder="URL del nuevo avatar"
            className="form__input"
            id="avatar-link"
            name="avatar"
            required
            ref={avatarRef}
          />
          <span
            id="avatar-link-error"
            className="form__error input-span"
          ></span>
        </div>
      </fieldset>

      <button
        type="submit"
        className="form__submit-button popup-avatar__save-button"
      >
        Guardar
      </button>
    </form>
  );
}
