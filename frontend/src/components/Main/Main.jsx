import logo from "../../images/profile__image.jpg";
import Popup from "./Popup/Popup";
import NewCard from "./Popup/Form/NewCard/NewCard";
import EditProfile from "../Main/Popup/Form/EditProfile/EditProfile";
import EditAvatar from "./Popup/Form/EditAvatar/EditAvatar";
import Card from "./Components/Card/Card";
import { api } from "../../utils/api";
//Importación de Hooks//
import { useState, useEffect, useContext } from "react";

//Importación de objetos de contexto//
import CurrentUserContext from "../../contexts/CurrentUserContext";

//Proveedores//

export default function Main(props) {
  //Variables de Estado//

  const {
    onOpenPopup,
    onClosePopup,
    popup,
    onCardLike,
    onCardDelete,
    cards,
    onAddPlaceSubmit,
  } = props;

  //Valor del contextp//

  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  //Popups//
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const EditProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const EditAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main>
      <div className="profile">
        <div className="profile__main">
          <div className="profile__image-container">
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Imagen del usuario"
            />
            <button
              className="profile__image-button"
              alt="Icono para editar imagen de perfil"
              onClick={() => onOpenPopup(EditAvatarPopup)}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h2 className="profile__name">{currentUser.name}</h2>
              <button
                className="profile__edit-button"
                alt="Botono de editar perfil"
                onClick={() => onOpenPopup(EditProfilePopup)}
              ></button>
            </div>
            <h3 className="profile__description">{currentUser.about}</h3>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </div>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      <ul className="cards__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            currentUser={currentUser}
            onOpenPopup={onOpenPopup}
            handleClosePopup={onClosePopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}
