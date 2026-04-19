class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getUserProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error de respuesta de getUserProfile()");
        }

        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error("Error en getUserProfile()", err);
      });
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error de respuesta de changeUserInfo()");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Respuesta de changeUserInfo() exitosa");
        return data;
      })
      .catch((err) => {
        console.error("Error en changeUserInfo()", err);
      });
  }

  // getCardList() {
  //   return fetch(`${this.baseUrl}/cards/`, {
  //     method: "GET",
  //     headers: this._getHeaders(),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Error de respuesta de getInitialCards()");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       // console.log("Cartas iniciales obtenidas correctamente", data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log("Error en getInitialCards()", err);
  //     });
  // }

  getCardList() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error de respuesta de getCardList()");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Cartas recibidas:", data);
        return data.data;
      })
      .catch((err) => {
        console.log("Error en getCardList()", err);
        return [];
      });
  }

  addCardToList(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error de respuesta de addCardToList()");
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error en addCardToList()", err);
        return Promise.reject(err);
      });
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCardFromServer(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error al borrar carta del servidor");
      }
      return res.json();
    });
  }

  getAvatarFromServer() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener imagen del avatar del usuario");
        }
        return res.json();
      })
      .then((data) => {
        return data.avatar;
      });
  }

  setUserAvatar(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          "Error al cambiar imagen del avatar del usuario en el servidor"
        );
      }
      return res.json();
    });
  }
}

const baseUrl = "http://localhost:3001";
export const api = new Api(baseUrl);
