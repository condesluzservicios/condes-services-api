const fs = require('fs/promises');
const path = require('path');
const services = require('../../services/news/news.services');

const createNewNews = async (req, res) => {
  const { titulo, author, contenido, finalPathImg } = req.body;

  // const finalPath = path.join(
  //   'images',
  //   req.file.filename + '.' + req.file.mimetype.split('/').pop()
  // );

  // const oldPath = req.file.path;
  // const newPAth = req.file.path + '.' + req.file.mimetype.split('/').pop();

  // await fs.rename(oldPath, newPAth);

  const data = {
    title: titulo,
    author,
    content: contenido,
    pathImage: finalPathImg,
  };

  const createdNews = await services.saveNews(data);
  res.json(createdNews);
};

const getAllNews = async (req, res) => {
  const newsList = await services.getAllNews();
  res.json(newsList);
};

const getNewsPagination = async (req, res) => {
  const { skip } = req.query;
  const newsList = await services.getNewsFromDbByPagination(Number(skip) || 0);
  res.json(newsList);
};

const getNewsById = async (req, res) => {
  const { id } = req.query;
  const newsList = await services.getNewsById(id);
  res.json(newsList);
};

const updateNews = async (req, res) => {
  const { id_new, titulo, author, contenido, finalPathImg } = req.body;

  const data = {
    title: titulo,
    author,
    content: contenido,
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

  const updatedNews = await services.updateNewsById(id_new, data);
  res.json(updatedNews);
};

const deleteNews = async (req, res) => {
  const { id } = req.query;
  const deletedNews = await services.deleteNewsById(id);
  res.json(deletedNews);
};

const getNewsByTitleAuthor = async (req, res) => {
  const { query } = req.query;
  const newsList = await services.searchNewsByTitleOrAuthor(query);
  res.json(newsList);
};

const controller = {
  createNewNews,
  getAllNews,
  getNewsPagination,
  getNewsById,
  getNewsByTitleAuthor,
  updateNews,
  deleteNews,
};

module.exports = controller;
