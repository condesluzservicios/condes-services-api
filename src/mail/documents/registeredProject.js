import { statusProgramsAndProject } from '../../constants/entities.js';

// <p><b>Área del proyecto:</b> ${data.project_area}</p>
export const formatEmailRegisteredProject = (data) => {
  const format = `<main style="font-family: Arial, Helvetica, sans-serif;background-color:gainsboro; display: flex; justify-content:center; align-items: center; flex-direction:column; margin:0px;">
  <img width="150px" src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes">
  
  <h1>Información de registro de proyecto ${data.title}.</h1>

  <div style="">
    <p>El proyecto con id <span><b>${
      data.project_code
    }</b></span> ha sido registrado <span style="color:green">exitosamente</span>.</p>
    
    <p>El proyecto será revisado por el equipo de gestion de proyectos. En los proximos días recibirá un correo informandole el estado de aprobación.</p>
    
    <p><b>Registrado por:</b> <span>${data.name} ${data.last_name}</span></p>

    <p><b>Fecha de registro:</b> <span>${
      new Date(data.createdAt).toISOString().split('T')[0]
    }</span></p>

    <p><b>Identificación:</b> ${data.type_identification}-${
    data.identification
  }</p>

    <p><b>investigadores:</b> ${
      data?.participants && data.participants.map((part) => part.name)
    }</p>

    <p><b>Estatus:</b> ${data.status_project ? 'Aprobado' : 'Por aprobar'}</p>
    

    <p><b>Línea de investigacion:</b> ${data.line_research}</p>

    <p><b>Tipo de proyecto:</b> ${data.type_project}</p>

    <p><b>Código del proyecto:</b> ${'#' + data.project_code}</p>

    <h3>Investigador principal</h3>

    <p><b>Nombre:</b> ${data.name} ${data.last_name}</p>

    <p><b>Cédula:</b> ${String(data.type_identification).toUpperCase()}-${
    data.identification
  }</p>

    <p><b>Profesión:</b> ${data.profession}</p>

    <p><b>Especialidad:</b> ${data.specialty}</p>
    
    <p><b>Institución:</b> ${data.institution}</p>
    
    <p><b>Ente de investigación:</b> ${data.research_unit}</p>

    <p><b>Email:</b> ${data.email}</p>

    <p><b>Teléfono:</b> ${data.cod_number}-${data.phone}</p>
    
    <p><b>Facultad/Núcleo:</b> ${data.faculty_core}</p>

    <p><b>Descripción del proyecto:</b> ${data.project_summary}</p>

    <p><b>Objetivo general:</b> ${data.general_objective}</p>

    <p><b>Objetivos específicos:</b> ${data.specific_objectives}</p>

    <p><b>Hipótesis:</b> ${data.hypothesis}</p>

    <p><b>Metodología a utilizar:</b> ${data.methodology_used}</p>

    <p><b>Viabilidad y aplicabilidad de los resultados:</b> ${
      data.feasibility_research
    }</p>
    <p>
      <a target={'_blank'} rel="noreferrer" href="${
        data.chronogram_activities.file.url
      }">
        <b>
          Cronograma de actividades
        </b>
      </a>    
    </p>

    <br>
    <div>
      <h2>Documentos</h2>
      ${
        data?.documents &&
        data.documents.map(
          (document) =>
            `<div>
          <a target={'_blank'} rel="noreferrer" href="${document.file.url}">
            <span>
              ${
                document.name === 'faculty_council_approval'
                  ? 'Aprobación del consejo de profesores'
                  : document.name === 'technical_board_approval'
                  ? 'Aprobación del consejo técnico'
                  : document.name === 'curriculum_vitae_teaching_staff'
                  ? 'Curriculum vitae personal docente'
                  : document.name === 'letters_dedication_personnel'
                  ? 'Cartas de dedicación del personal'
                  : ''
              }
            </span>
          </a>
        </div>`
        )
      }
    </div>
    <br>
    <h4>Atentamente el equipo de CONDES.</h4>
  </div>
</main>`;

  return format;
};

export const formatEmailNotificationApprovalProject = (data, unApproval) => {
  const format = `<main style="font-family: Arial, Helvetica, sans-serif;background-color:gainsboro; display: flex; justify-content:center; align-items: center; flex-direction:column; margin:0px;">
  <img width="150px" src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes" />
  
  <h1>Información de actualización de proyecto ${data.title}.</h1>

  <div>
    <p>El proyecto con id <b>${data.project_code}</b> ha sido ${
    data.status_project
  }.</p>

  ${
    data.status_project === statusProgramsAndProject.approved &&
    '<p>Usted cuenta con quince(15) días hábiles para notificar la fecha de inicio. En su defecto notificar los motivos por los cuales no se puede iniciar.</p>'
  }

    ${
      unApproval
        ? `<p><b>Motivo de la desaprobación del proyecto:</b> ${unApproval}</p>`
        : ''
    }
      
    <p><b>Registrado por:</b> <span>${data.name} ${data.last_name}</span></p>

    <p><b>Fecha de registro:</b> <span>${
      new Date(data.createdAt).toISOString().split('T')[0]
    }</span></p>

    <p><b>Identificación:</b> ${data.type_identification}-${
    data.identification
  }</p>

    <p><b>Estatus:</b> ${data.status_project ? 'Aprobado' : 'Por aprobar'}</p>
    
    <p><b>Área del proyecto:</b> ${data.project_area}</p>

    <p><b>Línea de investigacion:</b> ${data.line_research}</p>

    <p><b>Tipo de proyecto:</b> ${data.type_project}</p>

    <p><b>Código del programa:</b> ${'#' + data.program_code}</p>
    <br>
    <h3>Investigador principal</h3>

    <p><b>Nombre:</b> ${data.name} ${data.last_name}</p>

    <p><b>Cédula:</b> ${String(data.type_identification).toUpperCase()}-${
    data.identification
  }</p>

    <p><b>Profesión:</b> ${data.profession}</p>

    <p><b>Especialidad:</b> ${data.specialty}</p>
    
    <p><b>Institución:</b> ${data.institution}</p>
    
    <p><b>Ente de investigación:</b> ${data.research_unit}</p>

    <p><b>Email:</b> ${data.email}</p>

    <p><b>Teléfono:</b> ${data.cod_number}-${data.phone}</p>
    
    <p><b>Facultad/Núcleo:</b> ${data.faculty_core}</p>

    <p><b>Descripción del proyecto:</b> ${data.project_summary}</p>

    <p><b>Objetivo general:</b> ${data.general_objective}</p>

    <p><b>Objetivos específicos:</b> ${data.specific_objectives}</p>

    <p><b>Hipótesis:</b> ${data.hypothesis}</p>

    <p><b>Metodología a utilizar:</b> ${data.methodology_used}</p>

    <p><b>Viabilidad y aplicabilidad de los resultados:</b> ${
      data.feasibility_research
    }</p>
    <p>
      <a target={'_blank'} rel="noreferrer" href="${
        data.chronogram_activities.file.url
      }">
        <b>
          Cronograma de actividades
        </b>
      </a>
    </p>

    <br>
    <h4>Atentamente el equipo de CONDES.</h4>
  </div>
</main>`;

  return format;
};

export const formatEmailNotificationUserRegisterFromAdmin = (data) => {
  return `<main style="font-family: Arial, Helvetica, sans-serif;background-color:gainsboro; display: flex; justify-content:center; align-items: center; flex-direction:column; margin:0px;">
  <img width="150px" src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes" />
  
  <h1>Credenciales de su usuario para poder ingresar al sistema condes.</h1>

  <div>
    <p>Usuario: ${data.email}</p>
    <p>Contraseña: ${data.plain_password}</p>
  </div
  <div>
    <p>Por favor, por motivos de seguridad, inicie sesión y cambie su contraseña lo mas pronto posible</p>
  </div>
  `;
};

export const formatEmailNotificationAssignmentProjectToEvaluator = (data) => {
  return `<main style="font-family: Arial, Helvetica, sans-serif;background-color:gainsboro; display: flex; justify-content:center; align-items: center; flex-direction:column; margin:0px;">
  <img width="150px" src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes" />
  
  <h1>Un proyecto le ha sido asignado.</h1>

  <div>
    <p>Asignado por: ${data.assignmentBy}</p>
    <p>Nombre del proyecto: ${data.title}</p>
    <p>Proyecto número: ${data.project_code}</p>
  </div
  <div>`;
};

export const formatEmailNotificationAssignmentProgramToEvaluator = (data) => {
  return `<main style="font-family: Arial, Helvetica, sans-serif;background-color:gainsboro; display: flex; justify-content:center; align-items: center; flex-direction:column; margin:0px;">
  <img width="150px" src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes" />
  
  <h1>Un programa le ha sido asignado.</h1>

  <div>
    <p>Asignado por: ${data.assignmentBy}</p>
    <p>Nombre del programa: ${data.title}</p>
    <p>Programa número: ${data.project_code}</p>
  </div
  <div>`;
};
