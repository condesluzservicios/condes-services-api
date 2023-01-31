export const formatEmailNotificationRegisterProgram = (data) => {
  return `<main style="font-family: Arial, Helvetica, sans-serif;background-color:gainsboro; display: flex; justify-content:center; align-items: center; flex-direction:column; margin:0px;">
    <img width="150px" src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes" />
    
    <h1>Información de registro de programa ${data.title}.</h1>
  
        <div>
            <p>El programa con código <span><b>${
              data.program_code
            }</b></span> ha sido registrado <span style="color:green">exitosamente</span>.</p>
            
            <p>El programa será revisado por el equipo de gestion de proyectos. En los proximos días recibirá un correo informandole el estado de aprobación.</p>

            <p><b>Registrado por:</b> <span>${data.name} ${
    data.last_name
  }</span></p>

            <p><b>Fecha de registro:</b> <span>${
              new Date(data.createdAt).toISOString().split('T')[0]
            }</span></p>

            <p><b>Identificación:</b> ${data.type_identification}-${
    data.identification
  }</p>
            <p><b>Estatus:</b> ${data.status_program}</p>

            <p><b>Línea de investigacion:</b> ${data.line_research}</p>

            <p><b>Tipo de proyecto:</b> ${data.type_program}</p>

            <p><b>Código del proyecto:</b> ${'#' + data.program_code}</p>

            <p><b>Objetivo general:</b> ${data.general_objective}</p>
        <div>
    </main>`;
};
