import { constants } from '../../constants/pagination.constants.js';
import ProjectsModel from '../../Models/projects/projects.model.js';

/**
 * @param {*} project to save
 * @returns project saved
 */
export const saveNewProject = async (project) => {
  try {
    const newProject = new ProjectsModel(project);
    const projectSaved = await newProject.save();

    return projectSaved;
  } catch (error) {
    console.log('error al crear nuevo proyecto');
    return null;
  }
};

/**
 * @param {*} id project
 * @returns data project
 */
export const getProjectById = async (id) => {
  try {
    const project = await ProjectsModel.findById(id)
      .populate({
        path: 'participants',
      })
      .populate({
        path: 'id_assignedBy',
        select: '_id name last_name email line_research',
      })
      .populate({
        path: 'assigned_to',
        select: '_id name last_name email line_research',
      });
    return project;
  } catch (error) {
    console.log(`error al buscar proyecto ${error}`);
    return null;
  }
};

export const getProjectsList = async (skip = 0, flag) => {
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
    return null;
  }
};

/**
 * @returns amounts of projects
 */
export const getAmountProjectsByCategoryProject = async () => {
  try {
    const amountProject = await ProjectsModel.count();

    return amountProject;
  } catch (error) {
    console.log('Error al obtener cantidad de proyectos.', error);
    throw new Error('Error al obtener cantidad de proyectos.');
  }
};

/**
 * @param { number } id_project id project update
 * @param { project data } projectData project update
 * @returns project updated
 */
export const updateProject = async (id_project, projectData) => {
  try {
    const projectUpdated = await ProjectsModel.findByIdAndUpdate(
      id_project,
      { ...projectData },
      {
        upsert: true,
      }
    );

    return projectUpdated;
  } catch (error) {
    console.log('Error al actualizar proyecto.', error);
    throw new Error('Error al actualizar proyecto.');
  }
};
