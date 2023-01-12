import ProjectsModel from '../../Models/projects/projects.model.js';

export const saveNewProject = async (project) => {
  try {
    const newProject = new ProjectsModel(project);
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
