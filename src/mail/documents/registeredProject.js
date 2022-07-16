const formatEmailRegisteredProject = (data) => {
  const format = `<main>
  <img src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes">
  
  <h1>Información de registro de proyecto ${data.title}.</h1>

  <div>
    <p>El proyecto con id <b>${
      data.program_code
    }</b> ha sido registrado exitosanmente.</p>
    
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
    
    <p><b>Área del proyecto:</b> ${data.project_area}</p>

    <p><b>Línea de investigacion:</b> ${data.line_research}</p>

    <p><b>Tipo de proyecto:</b> ${data.type_project}</p>

    <p><b>Código del programa:</b> ${'#' + data.program_code}</p>

    <h3>Investigador principal</h3>

    <p><b>Nombre:</b> ${data.name} ${data.last_name}</p>

    <p><b>Cédula:</b> ${String(data.type_identification).toUpperCase()}-${
    data.identification
  }</p>

    <p><b>Profesión:</b> ${data.profession}</p>

    <p><b>Especialidad:</b> ${data.specialty}</p>
    
    <p><b>Institución:</b> Hola1</p>
    
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

    <p><b>Cronograma de actividades:</b> ${data.chronogram_activities}</p>

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

    <h4>Atentamente el equipo de CONDES.</h4>
  </div>
</main>`;

  return format;
};

const formatEmailNotificationApprovalProject = (data, unApproval) => {
  const format = `<main>
  <img src="https://i.ibb.co/7jGPPg1/logo512.png" alt="logo-condes" />
  
  <h1>Información de actualización de proyecto ${data.title}.</h1>

  <div>
    <p>El proyecto con id <b>${data.program_code}</b> ha sido ${
    data.status_project
  }.</p>

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

    <h3>Investigador principal</h3>

    <p><b>Nombre:</b> ${data.name} ${data.last_name}</p>

    <p><b>Cédula:</b> ${String(data.type_identification).toUpperCase()}-${
    data.identification
  }</p>

    <p><b>Profesión:</b> ${data.profession}</p>

    <p><b>Especialidad:</b> ${data.specialty}</p>
    
    <p><b>Institución:</b> Hola1</p>
    
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

    <p><b>Cronograma de actividades:</b> ${data.chronogram_activities}</p>

    <h4>Atentamente el equipo de CONDES.</h4>
  </div>
</main>`;

  return format;
};

const formatsEmailsProject = {
  formatEmailRegisteredProject,
  formatEmailNotificationApprovalProject,
};

module.exports = formatsEmailsProject;
