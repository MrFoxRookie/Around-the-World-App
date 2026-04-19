# Tripleten web_project_around_auth

Se presenta una aplicación React que consta de dos formularios, cada uno asociado a su respectivo endpoint, los cuales permiten a los usuarios registrarse en la API de la plataforma asi como acceder a la ruta protegida. Una vez el registro de los datos del usuario se registrados exitosamente, este será automáticamente redireccionado a la ruta correspondiente al inicio de sesión.

Dicho lo anterior, una vez llenados y enviados los datos correspondientes, el usuario no solo es redireccionado a la ruta protegida /, sino que también obtiene una clave jwt, la cual es almacenada en su navegador y le permitirá acceder en el futuro a dicha ruta sin la necesidad de iniciar sesión nuevamente.

Entre las tecnologías empleadas se encuentran: HTML inyectado mediante React, CSS, JS, hooks de estado, utilización de contextos para transmisión de datos a varios niveles, así como la utilización de redireccionamiento acorde las acciones realizadas por el usuario.
