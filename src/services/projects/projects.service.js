import ProjectsModel from '../../Models/projects/projects.model.js';
import ParticipantsModel from '../../Models/projects/projectParticipants.model.js';
import * as projectsRepository from '../../repositories/projects.repositories/projects.repository.js';
import { constants } from '../../constants/pagination.constants.js';
import * as emailsService from '../../services/emails/emails.service.js';
import { generateSequentialNumber } from '../../utils/projects.utils.js';

export const createNewProject = async (data) => {
  try {
    const newProject = new ProjectsModel(data);
    const projectSaved = await newProject.save();

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
  let ProjectsList = [];
  let count = 0;

  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    if (flag === '') {
      count = await ProjectsModel.estimatedDocumentCount();

      ProjectsList = await ProjectsModel.find()
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });
    } else {
      ProjectsList = await ProjectsModel.find({
        status_project: { $regex: `^${flag}$`, $options: 'i' },
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      count = ProjectsList.length;
    }

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: ProjectsList,
    };

    return {
      msg: 'Lista de proyectos',
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

      const code = generateSequentialNumber(amountProjects, data.type_project);

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
    const statusProjectUpdated = await ProjectsModel.findByIdAndUpdate(
      data.id,
      {
        status_project: data.isApproval ? 'Aprobado' : 'Desaprobado',
      },
      { upsert: true }
    );

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

// helpers
const generateNewCodeProjectByFlag = async () => {};
