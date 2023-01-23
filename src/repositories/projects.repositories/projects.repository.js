import { userRoles } from '../../constants/entities.js';
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
    console.log(`error al crear nuevo proyecto ${error}`);
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

/**
 * @param {*} skip int amount of projects to skip
 * @param {*} query string to search for
 * @returns projects list
 */
export const getProjectsList = async (skip = 0, query) => {
  let ProjectsList = [];
  let count = 0;

  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    if (query === '') {
      count = await ProjectsModel.estimatedDocumentCount();

      ProjectsList = await ProjectsModel.find()
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });
    } else {
      ProjectsList = await ProjectsModel.find({
        status_project: { $regex: `^${query}$`, $options: 'i' },
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

    return data;
  } catch (error) {
    console.log('error al obtener proyectos ->', error);
    return null;
  }
};

export const getProjectListByLineSearchWithOutAssignmentRepository = async ({
  id_user,
  role,
  line_research,
  skip,
}) => {
  skip = skip > 0 ? (skip - 1) * constants.ITEM_PER_PAG : skip;

  try {
    if (role === userRoles.coordinator) {
      const count = await ProjectsModel.count({
        line_research,
        id_assignedBy: { $exists: false },
        assigned_to: { $exists: false },
        status_project: 'Por aprobar',
      });

      const projectsList = await ProjectsModel.find({
        line_research,
        id_assignedBy: { $exists: false },
        assigned_to: { $exists: false },
        status_project: 'Por aprobar',
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

      return {
        pagination: {
          count,
          pageCount,
        },
        data: projectsList,
      };
    }

    if (role === userRoles.evaluator) {
      const count = await ProjectsModel.count({
        line_research,
        assigned_to: id_user,
        status_project: 'Por aprobar',
      });

      const projectsList = await ProjectsModel.find({
        line_research,
        assigned_to: id_user,
        status_project: 'Por aprobar',
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

      return {
        pagination: {
          count,
          pageCount,
        },
        data: projectsList,
      };
    }

    const count = await ProjectsModel.count({
      line_research,
      id_assignedBy: { $exists: false },
      assigned_to: { $exists: false },
      status_project: 'Por aprobar',
    });

    const projectsList = await ProjectsModel.find({
      line_research,
      id_assignedBy: { $exists: false },
      assigned_to: { $exists: false },
      status_project: 'Por aprobar',
    })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    return {
      pagination: {
        count,
        pageCount,
      },
      data: projectsList,
    };
  } catch (error) {
    console.log('Error al actualizar proyecto.', error);
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
    console.log(`Error al actualizar proyecto. ${error}`);
    // throw new Error('Error al actualizar proyecto.');
  }
};
