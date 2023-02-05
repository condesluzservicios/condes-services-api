import ProjectsModel from '../../Models/projects/projects.model.js';
import ParticipantsModel from '../../Models/projects/projectParticipants.model.js';
import { typesProjectsKeys } from '../../constants/entities.js';
import { constants } from '../../constants/pagination.constants.js';
import * as projectsRepository from '../../repositories/projects.repositories/projects.repository.js';
import { getUserByIdRepository } from '../../repositories/users.repositories/users.repository.js';
import * as emailsService from '../../services/emails/emails.service.js';
import { generateSequentialNumberProgramAndProject } from '../../utils/projects.utils.js';
import connectMailer from '../../mail/config.js';
import { formatEmailNotificationAssignmentProjectToEvaluator } from '../../mail/documents/registeredProject.js';
import { statusProgramsAndProject } from '../../constants/entities.js';
import { getSettings } from '../../repositories/settings.repositories/settings.repository.js';

export const createNewProject = async (data) => {
  try {
    const projectSaved = await projectsRepository.saveNewProject(data);

    return {
      success: true,
      msg: 'Nuevo proyecto registrado exitosamente.',
      data: projectSaved,
    };
  } catch (error) {
    console.log('error al crear nuevo proyecto');
    return {
      msg: 'Error al registrar nuevo proyecto',
      success: false,
      data: [],
    };
  }
};

export const getPaginationAllProjects = async (skip = 0, flag) => {
  const projectsList = await projectsRepository.getProjectsList(skip, flag);

  if (!projectsList) {
    return {
      msg: 'Error al obtener proyectos',
      success: false,
      data: null,
    };
  }

  return {
    msg: 'Lista de proyectos',
    success: false,
    data: projectsList,
  };
};

export const getProjectById = async (idProject) => {
  try {
    const Project = await projectsRepository.getProjectById(idProject);

    const formats = await getSettings();

    const data = {
      ...Project,
      formats: { ...formats[0] },
    };

    const cleanData = {
      ...data._doc,
      formats: { ...data.formats._doc },
    };

    return {
      msg: 'Lista de proyecto',
      success: true,
      data: cleanData,
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

export const getProjectByIdUser = async (idUser, skip = 0) => {
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    const count = await ProjectsModel.estimatedDocumentCount();

    const ProjectsList = await ProjectsModel.find({ id_user: idUser })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: ProjectsList,
    };

    return {
      msg: 'Lista de proyecto',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener proyectos ->', error);
    return {
      msg: 'Error al obtener proyectos',
      success: false,
      data: error,
    };
  }
};

export const updateProject = async (data, flag = '') => {
  try {
    if (flag === 'stepTwo') {
      const amountProjects =
        await projectsRepository.getAmountProjectsByCategoryProject();

      const code = generateSequentialNumberProgramAndProject(
        amountProjects,
        data.type_project
      );

      data.project_code = code;

      const updated = await projectsRepository.updateProject(data.id, data);

      return {
        success: true,
        msg: 'Nuevo proyecto actualizado exitosamente.',
        data: updated,
      };
    }

    if (flag === 'stepFour') {
      const participants = [];

      for (const participant of data.membersList) {
        const newParticipant = new ParticipantsModel(participant);
        const saved = await newParticipant.save();
        participants.push(saved);
      }

      const projectUpdated = await projectsRepository.updateProject(
        data.id_project,
        { participants }
      );

      return {
        success: true,
        msg: 'Nuevo proyecto actualizado exitosamente.',
        data: projectUpdated,
      };
    }

    if (flag === 'stepFive') {
      const documentsSaved = await ProjectsModel.findByIdAndUpdate(
        data.id_project,
        data,
        {
          upsert: true,
        }
      );

      if (!documentsSaved) {
        return {
          success: false,
          msg: 'Error al guardar documentos. Intente de nuevo.',
          data: [],
        };
      }

      // * envío de correos electrónicos
      const notification =
        await emailsService.sendEmailNotificationProjectCreated(
          data.id_project
        );

      if (notification?.success) {
        return {
          success: true,
          msg: 'Nuevo proyecto actualizado exitosamente.',
          data: notification,
        };
      } else {
        return {
          msg: 'Error al actualizar proyecto',
          success: false,
          data: [],
        };
      }
    }

    const projectUpdated = await projectsRepository.updateProject(
      data.id,
      data
    );

    return {
      success: true,
      msg: 'Nuevo proyecto actualizado exitosamente.',
      data: projectUpdated,
    };
  } catch (error) {
    console.log('error al actualizar proyecto --------------->', error);
    return {
      msg: 'Error al actualizar proyecto',
      success: false,
      data: [],
    };
  }
};

export const updateApprovalProject = async (data) => {
  try {
    const projectSelected = await projectsRepository.getProjectById(data.id);

    if (
      projectSelected?.type_project === typesProjectsKeys.financiado &&
      !projectSelected?.grant_application_for_project_approval
    ) {
      return {
        msg: 'Debe proporcionar una solicitud de subvencion.',
        success: false,
        data: [],
      };
    }

    const statusProjectUpdated = await projectsRepository.updateProject(
      data.id,
      {
        status_project: data.isApproval
          ? statusProgramsAndProject.approved
          : statusProgramsAndProject.disapproved,
      }
    );

    // ProjectsModel.findByIdAndUpdate(
    //   data.id,
    //   {
    //     status_project: data.isApproval
    //       ? statusProgramsAndProject.approved
    //       : statusProgramsAndProject.disapproved,
    //   },
    //   { upsert: true }
    // );

    if (!statusProjectUpdated) {
      return {
        msg: 'Error al actualizar proyecto',
        success: false,
        data: [],
      };
    }

    // * envío de correos electrónicos
    const notification =
      await emailsService.sendEmailNotificationProjectApproval(
        data.id,
        data.object
      );

    if (notification?.success) {
      return {
        success: true,
        msg: 'Proyecto actualizado exitosamente.',
        data: notification,
      };
    } else {
      return {
        msg: 'Error al actualizar proyecto',
        success: false,
        data: [],
      };
    }
  } catch (error) {
    console.log(
      'error al actualizar estado del proyecto --------------->',
      error
    );
    return {
      msg: 'Error al actualizar estado del proyecto',
      success: false,
      data: [],
    };
  }
};

export const searchProjectsByQueryFromDb = async (query) => {
  let result = [];
  let skip = 1;
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    // const count = await ProjectsModel.estimatedDocumentCount();
    const projectsList = await ProjectsModel.find({
      title: { $regex: '.*' + query + '.*', $options: 'i' },
    })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    if (projectsList.length > 0) {
      result = projectsList;
    } else {
      const projectsList = await ProjectsModel.find({
        program_code: { $regex: '.*' + query + '.*', $options: 'i' },
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      result = projectsList;
    }

    const pageCount = Math.ceil(result.length / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count: result.length,
        pageCount,
      },
      data: result,
    };

    return {
      msg: 'Lista de proyectos.',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener proyectos ->', error);
    return {
      msg: 'Error al obtener proyectos',
      success: false,
      data: error,
    };
  }
};

// * coordinates and evaluators
export const assignProjectsToEvaluators = async (
  id_project,
  id_assignedBy,
  id_evaluator
) => {
  try {
    //* buscamos el proyecto
    const projectSelected = await projectsRepository.getProjectById(id_project);

    if (projectSelected.id_assignedBy || projectSelected.assigned_to) {
      return {
        success: false,
        msg: 'Proyecto ya ha sido asignado.',
        data: null,
      };
    }

    projectSelected.id_assignedBy = id_assignedBy;
    projectSelected.assigned_to = id_evaluator;

    const evaluator_data = await getUserByIdRepository(id_evaluator);
    const coordinator_data = await getUserByIdRepository(id_assignedBy);

    const assigned = await projectsRepository.updateProject(id_project, {
      id_assignedBy: id_assignedBy,
      assigned_to: id_evaluator,
    });

    projectSelected.assignmentBy =
      coordinator_data.name + ' ' + coordinator_data.last_name;

    const notification = await connectMailer({
      email_dest: evaluator_data.email,
      subject: 'Notificación de asignación de proyecto.',
      format:
        formatEmailNotificationAssignmentProjectToEvaluator(projectSelected),
    });

    if (!notification.accepted.length > 0) {
      return {
        msg: 'Proyecto asignado exitosamente. Error al enviar correo de asignación de proyecto.',
        success: true,
        data: assigned,
      };
    }

    // * notificar al evaluador que se le ha asignado un proyecto

    return {
      msg: 'Proyecto asignado exitosamente.',
      success: true,
      data: assigned,
    };
  } catch (error) {
    console.log(`error al asignar projecto ${error}`);
    return {
      msg: 'Error al asignar proyecto',
      success: true,
      data: error,
    };
  }
};
