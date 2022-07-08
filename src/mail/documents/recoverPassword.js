const formatRecoveryPassword = (password) => {
  const format = `<main>
    <div>
        <p><b>Su nueva contraseña es:</b> ${password}</p>
        <p>Inicie sesión con su correo y nueva contraseña. Por seguridad cambiala por una contraseña personalizada</p>
    </div>
    </main>`;

  return format;
};

module.exports = formatRecoveryPassword;
