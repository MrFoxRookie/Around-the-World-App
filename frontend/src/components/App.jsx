import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as auth from "../utils/auth";
import * as token from "../utils/token";
import InfoToolTip from "./InfoToolTip/InfoToolTip";

// Paso 1
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Información del usuario//
  useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getUserProfile()
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isLoggedIn]);

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData.data);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData.data);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCardToList(data.name, data.link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
      })
      .then(() => {
        handleClosePopup();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getCardList()
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  async function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((res) => {
        const newCard = res.data;
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards((currentArray) =>
          currentArray.filter((cardToRemove) => cardToRemove._id !== card._id)
        );
      })
      .catch((err) => console.error(err));
  }

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const [isRegister, setIsRegister] = useState(true);

  const [userEmail, setUserEmail] = useState("");

  function handleRegistration({ email, password }) {
    auth
      .registerNewUser(email, password)
      .then((data) => {
        console.log(data);
        setIsInfoToolTipOpen(true);
        setIsRegister(true);
      })
      .catch((error) => {
        console.error(error);
        setIsRegister(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .loginUser(email, password)
      .then((data) => {
        token.setToken(data.token);
        setIsLoggedIn(true);
        navigate("/");
        setUserEmail(email);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) return;

    auth
      .tokenAuthorization(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setUserEmail(data.data.email);
        navigate("/");
      })
      .catch((err) => {});
  }, []);

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      <Header userEmail={userEmail} onSignOut={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                onAddPlaceSubmit={handleAddPlaceSubmit}
              />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegistration} />}
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
        />
      </Routes>
      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        isSuccess={isRegister}
        onClose={() => {
          setIsInfoToolTipOpen(false);
          if (isRegister) {
            navigate("/signin");
          }
        }}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
