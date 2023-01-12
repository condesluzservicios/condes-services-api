import * as services from '../../services/courses/courses.services.js';

export const createCourse = async (req, res) => {
  const {
    date,
    certificado,
    duracion,
    modules,
    profesor,
    telefono,
    titulo,
    finalPathImg,
  } = req.body;

  const data = {
    date,
    duracion,
    certificado,
    profesor,
    telefono,
    titulo,
    pathImage: finalPathImg,
  };

  const createdCourse = await services.saveNewCourse(data, JSON.parse(modules));
  res.json(createdCourse);
};

export const getAllCourses = async (req, res) => {
  const coursesList = await services.getAllCourses();
  res.json(coursesList);
};

export const getAllCoursesPagination = async (req, res) => {
  const { skip } = req.query;
  const coursesList = await services.getAllCoursesPagination(Number(skip) || 0);
  res.json(coursesList);
};

export const getCourseById = async (req, res) => {
  const { id } = req.query;
  const course = await services.getCourseById(id);
  res.json(course);
};

export const searchCourseByTitleAndTeacher = async (req, res) => {
  const { query } = req.query;
  const coursesList = await services.searchCoursesByTitleOrTeacher(query);
  res.json(coursesList);
};

export const updateCourse = async (req, res) => {
  const {
    id_course,
    date,
    certificado,
    duracion,
    modules,
    profesor,
    telefono,
    titulo,
    finalPathImg,
  } = req.body;

  const data = {
    id: id_course,
    date,
    duracion,
    certificado,
    profesor,
    telefono,
    titulo,
  };

  if (finalPathImg) {
    data.pathImage = finalPathImg;
  }

  // if (req?.file) {
  //   const finalPath = path.join(
  //     'images',
  //     req.file.filename + '.' + req.file.mimetype.split('/').pop()
  //   );

  //   const oldPath = req.file.path;
  //   const newPAth = req.file.path + '.' + req.file.mimetype.split('/').pop();

  //   await fs.rename(oldPath, newPAth);

  //   data.pathImage = finalPath;
  // }

  const updatedCourse = await services.updateCourseById(
    data,
    JSON.parse(modules)
  );
  res.json(updatedCourse);
};

export const deleteCourseById = async (req, res) => {
  const { id } = req.query;
  const deletedCourse = await services.deletedCourseById(id);
  res.json(deletedCourse);
};
