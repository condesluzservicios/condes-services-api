export const formtarContactUs = (data) => {
  const { name, last_name, email, country, cod_number, phone, messages } = data;

  const format = `<main>
  <div>
      <p><b>Nombre:</b> ${name}</p>
      <p><b>Apellido:</b> ${last_name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Pais:</b> ${country}</p>
      <p><b>Número de teléfono:</b> ${cod_number}-${phone}</p>
      <p><b>Mensaje:</b> ${messages}</p>
  </div>
  </main>`;

  return format;
};
