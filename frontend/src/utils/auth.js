export const BASE_URL = "http://localhost:3001";

export function registerNewUser(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 400)
        throw new Error("Uno de los campos se rellenó de forma incorrecta");
      throw new Error(`Error desconocido: ${res.status}`);
    }
    return res.json();
  });
}

export function loginUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 400)
        throw new Error("No se ha proporcionado uno o más campos");
      if (res.status === 401)
        throw new Error(
          "No se ha encontrado al usuario con el correo electrónico especificado"
        );
      throw new Error(`Error desconocido: ${res.status}`);
    }
    return res.json();
  });
}

export function tokenAuthorization(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    if (res.status === 400) {
      throw new Error(
        "Error 400: Token no proporcionado o proporcionado en el formato incorrecto"
      );
    }
    if (res.status === 401) {
      throw new Error("Error 401: El token provisto es inválido");
    }
    if (!res.ok) {
      throw new Error(`Error desconocido: ${res.status}`);
    }
    return res.json();
  });
}
