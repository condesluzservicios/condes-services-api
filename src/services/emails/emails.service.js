const ProjectsModel = require('../../Models/projects/projects.model');
const ParticipantsModel = require('../../Models/projects/projectParticipants.model');
const connectMailer = require('../../mail/config');
const formatEmailRegisteredProject = require('../../mail/documents/registeredProject');
const formatEmailNotificationApprovalProject = require('../../mail/documents/registeredProject');

const sendEmailNotificationProjectCreated = async (idProject) => {
  try {
    const projectData = await getProjectById(idProject);

    const resSendMail = await connectMailer({
      email_dest: projectData.data.email,
      subject: 'Información registro de proyecto.',
      format: formatEmailRegisteredProject(projectData.data),
    });

    if (!resSendMail.accepted.length > 0) {
      return {
        msg: 'Error al enviar correo de registro de proyecto',
        success: false,
        data: [],
      };
    }

    const resSendMailCondes = await connectMailer({
      subject: 'Información registro de proyecto.',
      format: formatEmailRegisteredProject(projectData.data),
    });

    if (!resSendMailCondes.accepted.length > 0) {
      return {
        msg: 'Error al enviar correo de registro de proyecto al administrador',
        success: false,
        data: [],
      };
    }

    return {
      msg: `Un correo a ${projectData.data.email} con la información de registro ha sido enviado exitosamente. Revise la bandeja de spam, por seguridad.`,
      success: true,
      data: [],
    };
  } catch (error) {
    console.log('Error al enviar correo registro de proyectos ->', error);
    return {
      msg: 'Error al enviar correo registro de proyectos',
      success: false,
      data: error,
    };
  }
};

const sendEmailNotificationProjectApproval = async (idProject) => {
  try {
    const projectData = await getProjectById(idProject);

    const resSendMail = await connectMailer({
      email_dest: projectData.data.email,
      subject: 'Información aprobación de proyecto.',
      format: formatEmailNotificationApprovalProject(projectData.data),
    });

    if (!resSendMail.accepted.length > 0) {
      return {
        msg: 'Error al enviar correo de registro de proyecto',
        success: false,
        data: [],
      };
    }

    return {
      msg: `Un correo a ${projectData.data.email} con la información de aprobación ha sido enviado exitosamente.`,
      success: true,
      data: [],
    };
  } catch (error) {
    console.log(
      'Error al enviar correo notificación de aprobación de proyecto ->',
      error
    );
    return {
      msg: 'Error al enviar correo notificación de aprobación de proyectos',
      success: false,
      data: error,
    };
  }
};

// * emergency
const getProjectById = async (idProject) => {
  try {
    const ProjectsList = await ProjectsModel.findById(idProject);

    const participantsList = await ParticipantsModel.find({
      id_project: idProject,
    });

    ProjectsList.participants = participantsList;

    return {
      msg: 'Lista de proyecto',
      success: true,
      data: ProjectsList,
    };
  } catch (error) {
    console.log('error al obtener proyecto ->', error);
    return {
      msg: 'Error al obtener proyecto',
      success: false,
      data: error,
    };
  }
};

const services = {
  sendEmailNotificationProjectCreated,
  sendEmailNotificationProjectApproval,
};

module.exports = services;
