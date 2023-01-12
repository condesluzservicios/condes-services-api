import { constants } from '../../constants/pagination.constants.js';
import ModelCourses from '../../Models/courses/courses.model.js';
import ModelModules from '../../Models/courses/modules.model.js';
import * as modulesServices from './modules.services.js/modules.service.js';

export const saveNewCourse = async (course, modules) => {
  try {
    const newCourse = new ModelCourses(course);
    const savedCourse = await newCourse.save();
    const modulesSaved = await modulesServices.associateModuleToCourse(
      modules,
      savedCourse._id
    );

    const idModules = modulesSaved.data.reduce((acc, el) => {
      return (acc = [...acc, el._id]);
    }, []);

    newCourse.modules = idModules;

    newCourse.save();

    return {
      msg: 'Curso guardado exitisamente.',
      success: true,
      data: savedCourse,
    };
  } catch (error) {
    console.log('error al guardar curso ->', error);
    return {
      msg: 'Error al guardar curso.',
      success: false,
      data: error,
    };
  }
};

export const getAllCourses = async () => {
  try {
    const coursesList = await ModelCourses.find()
      .skip(0)
      .limit(6)
      .populate('modules');

    return {
      msg: 'Lista de cursos.',
      success: true,
      data: coursesList,
    };
  } catch (error) {
    console.log('error al buscar curso ->', error);
    return {
      msg: 'Error al buscar curso.',
      success: false,
      data: error,
    };
  }
};

export const getAllCoursesPagination = async (skip = 0) => {
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    const count = await ModelCourses.estimatedDocumentCount();
    const coursesList = await ModelCourses.find()
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .populate('modules')
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: coursesList,
    };

    return {
      msg: 'Lista de cursos.',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al buscar curso ->', error);
    return {
      msg: 'Error al buscar curso.',
      success: false,
      data: [],
    };
  }
};

export const getCourseById = async (id) => {
  try {
    const coursesList = await ModelCourses.findById(id).populate('modules');

    if (coursesList)
      return {
        msg: 'Lista de cursos.',
        success: true,
        data: coursesList,
      };

    return {
      msg: 'Error al buscar curso.',
      success: false,
      data: {},
    };
  } catch (error) {
    console.log('error al buscar curso ->', error);
    return {
      msg: 'Error al buscar curso.',
      success: false,
      data: error,
    };
  }
};

export const searchCoursesByTitleOrTeacher = async (query) => {
  let result = [];
  let skip = 1;
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    // const count = await ModelNews.estimatedDocumentCount();
    const CoursesList = await ModelCourses.find({
      titulo: { $regex: '.*' + query + '.*', $options: 'i' },
    })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .populate('modules')
      .sort({ createdAt: -1 });

    if (CoursesList.length > 0) {
      result = CoursesList;
    } else {
      const CoursesList = await ModelCourses.find({
        profesor: { $regex: '.*' + query + '.*', $options: 'i' },
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .populate('modules')
        .sort({ createdAt: -1 });

      result = CoursesList;
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
      msg: 'Lista de cursos.',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener cursos ->', error);
    return {
      msg: 'Error al obtener cursos',
      success: false,
      data: error,
    };
  }
};

export const updateCourseById = async (course, modules) => {
  try {
    let newsModulesSaved = [];
    let modulesupdated = [];

    // actualizamos el curso
    const updatedCourse = await ModelCourses.findByIdAndUpdate(
      course.id,
      course
    );

    // registramos nuevos modulos en caso de que existan nuevos modulos
    const modulesWithoutRegister = modules.filter((mod) => !mod?._id);

    if (modulesWithoutRegister.length > 0) {
      const newsMdoulesAssociated =
        await modulesServices.associateModuleToCourse(
          modulesWithoutRegister,
          course.id
        );

      newsModulesSaved = newsMdoulesAssociated.data;
    }

    // obtenemos los modulos que ya estaban registrados
    const registered = modules.filter((mod) => mod?._id);

    // actualizamos los modulos que ya estaban guardados
    for (const iterator of registered) {
      const updated = await ModelModules.findByIdAndUpdate(
        iterator._id,
        iterator
      );

      modulesupdated.push(updated);
    }

    // obtenemos el nuevo arreglo de id de moduloes
    const newsModulesModificated = [...newsModulesSaved, ...modulesupdated];

    const idModules = newsModulesModificated.reduce((acc, el) => {
      return (acc = [...acc, el._id]);
    }, []);

    const done = await ModelCourses.findByIdAndUpdate(course.id, {
      modules: idModules,
    });

    return {
      msg: 'Curso actualizado exitisamente.',
      success: true,
      data: done,
    };
  } catch (error) {
    console.log('error al guardar curso ->', error);
    return {
      msg: 'Error al guardar curso.',
      success: false,
      data: [],
    };
  }
};

export const deletedCourseById = async (id) => {
  try {
    const deletedCourse = await ModelCourses.findByIdAndDelete({
      _id: id,
    });

    const deletedModules = await ModelModules.deleteMany({ id_course: id });

    deletedCourse.deletedModules = deletedModules;

    if (deletedCourse)
      return {
        msg: 'Curso eliminado exitosamente',
        success: true,
        data: deletedCourse,
      };

    return {
      msg: 'Error al eliminar curso.',
      success: false,
      data: {},
    };
  } catch (error) {
    console.log('error al eliminar curso ->', error);
    return {
      msg: 'Error al eliminar curso.',
      success: false,
      data: error,
    };
  }
};
