const formatRecoveryPassword = (pssword) => {
  const format = `<main>
    <div>
        <p><b>Su nueva contraseña es:</b> ${pssword}</p>
        <p>Inicie sesión con su correo y nueva contraseña. Por seguridad cambiela por una contraseña personalizada</p>
    </div>
    </main>`;

  return format;
};

module.exports = formatRecoveryPassword;
