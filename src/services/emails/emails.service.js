import ProjectsModel from '../../Models/projects/projects.model.js';
import ParticipantsModel from '../../Models/projects/projectParticipants.model.js';
import connectMailer from '../../mail/config.js';
import * as formatsEmailsProject from '../../mail/documents/registeredProject.js';

export const sendEmailNotificationProjectCreated = async (idProject) => {
  try {
    const projectData = await getProjectById(idProject);

    const resSendMail = await connectMailer({
      email_dest: projectData.data.email,
      subject: 'Información registro de proyecto.',
      format: formatsEmailsProject.formatEmailRegisteredProject(
        projectData.data
      ),
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
      format: formatsEmailsProject.formatEmailRegisteredProject(
        projectData.data
      ),
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

export const sendEmailNotificationProjectApproval = async (
  idProject,
  unApproval
) => {
  try {
    const projectData = await getProjectById(idProject);

    const resSendMail = await connectMailer({
      email_dest: projectData.data.email,
      subject: 'Información aprobación de proyecto.',
      format: formatsEmailsProject.formatEmailNotificationApprovalProject(
        projectData.data,
        unApproval
      ),
    });

    if (!resSendMail.accepted.length > 0) {
      return {
        msg: 'Error al enviar correo de actualización de estado del proyecto',
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

export const sendEmailNotificationUserCreated = async (user_data) => {
  try {
    const resSendMail = await connectMailer({
      email_dest: user_data.email,
      subject: 'Credenciales de usuario.',
      format:
        formatsEmailsProject.formatEmailNotificationUserRegisterFromAdmin(
          user_data
        ),
    });

    if (!resSendMail.accepted.length > 0) {
      return {
        msg: 'Error al enviar correo para notificar al nuevo usuario.',
        success: false,
        data: [],
      };
    }

    return {
      msg: `Un correo a ${user_data.email} con las credenciales de usuario fue enviado exitosamente.`,
      success: true,
      data: [],
    };
  } catch (error) {
    console.log('Error al enviar credenciales de usuario ->', error);
    return {
      msg: 'Error al enviar credenciales de usuarios',
      success: false,
      data: error,
    };
  }
};

// * emergency
export const getProjectById = async (idProject) => {
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
