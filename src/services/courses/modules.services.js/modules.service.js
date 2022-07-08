const ModelModulesCourse = require('../../../Models/courses/modules.model');

const associateModuleToCourse = async (modules, IDCourse) => {
  const results = [];
  try {
    for (const module of modules) {
      module.id_course = IDCourse;
      const newAssociation = new ModelModulesCourse(module);
      const moduleSaved = await newAssociation.save();
      results.push(moduleSaved);
    }

    return {
      msg: 'Moduleos guardados exitosamente',
      success: true,
      data: results,
    };
  } catch (error) {
    console.log('error al asociar modul a curso', error);
    return {
      msg: 'Error al asociar modul a curso',
      success: false,
      data: [],
    };
  }
};

const getModulesAssociatedToCourse = async (courses) => {
  const results = [];

  try {
    for (const course of courses) {
      const module = await ModelModulesCourse.find({
        id_course: course._id,
      });

      results.push(module);
    }

    return {
      msg: 'Moduleos asociados',
      success: true,
      data: [],
    };
  } catch (error) {
    console.log('error al buscar modulos de curso', error);
    return {
      msg: 'Error al buscar modulos de curso',
      success: false,
      data: [],
    };
  }
};

const services = { associateModuleToCourse, getModulesAssociatedToCourse };

module.exports = services;
