const path = require('path');
const fs = require('fs/promises');
const services = require('../../services/courses/courses.services');

const createCourse = async (req, res) => {
  const { date, certificado, duracion, modules, profesor, telefono, titulo } =
    req.body;

  const data = {
    date,
    duracion,
    certificado,
    profesor,
    telefono,
    titulo,
  };

  if (req?.file) {
    const finalPath = path.join(
      'images',
      req.file.filename + '.' + req.file.mimetype.split('/').pop()
    );

    const oldPath = req.file.path;
    const newPAth = req.file.path + '.' + req.file.mimetype.split('/').pop();

    await fs.rename(oldPath, newPAth);

    data.pathImage = finalPath;
  }

  const createdCourse = await services.saveNewCourse(data, JSON.parse(modules));
  res.json(createdCourse);
};

const getAllCourses = async (req, res) => {
  const coursesList = await services.getAllCourses();
  res.json(coursesList);
};

const getAllCoursesPagination = async (req, res) => {
  const { skip } = req.query;
  const coursesList = await services.getAllCoursesPagination(Number(skip) || 0);
  res.json(coursesList);
};

const getCourseById = async (req, res) => {
  const { id } = req.query;
  const course = await services.getCourseById(id);
  res.json(course);
};

const searchCourseByTitleAndTeacher = async (req, res) => {
  const { query } = req.query;
  const coursesList = await services.searchCoursesByTitleOrTeacher(query);
  res.json(coursesList);
};

const updateCourse = async (req, res) => {
  const {
    id_course,
    date,
    certificado,
    duracion,
    modules,
    profesor,
    telefono,
    titulo,
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

  if (req?.file) {
    const finalPath = path.join(
      'images',
      req.file.filename + '.' + req.file.mimetype.split('/').pop()
    );

    const oldPath = req.file.path;
    const newPAth = req.file.path + '.' + req.file.mimetype.split('/').pop();

    await fs.rename(oldPath, newPAth);

    data.pathImage = finalPath;
  }

  const updatedCourse = await services.updateCourseById(
    data,
    JSON.parse(modules)
  );
  res.json(updatedCourse);
};

const deleteCourseById = async (req, res) => {
  const { id } = req.query;
  const deletedCourse = await services.deletedCourseById(id);
  res.json(deletedCourse);
};

const controller = {
  createCourse,
  getAllCourses,
  getAllCoursesPagination,
  getCourseById,
  searchCourseByTitleAndTeacher,
  updateCourse,
  deleteCourseById,
};

module.exports = controller;
