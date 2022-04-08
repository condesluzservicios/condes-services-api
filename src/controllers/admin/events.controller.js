const path = require('path');
const fs = require('fs/promises');
const services = require('../../services/events/events.services');

const createEvent = async (req, res) => {
  const { titulo, author, contenido, finalPathImg } = req.body;

  const data = {
    title: titulo,
    author,
    content: contenido,
    pathImage: finalPathImg,
  };

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

  const createdEvent = await services.saveNewEvent(data);
  res.json(createdEvent);
};

const getAllEvents = async (req, res) => {
  const eventsList = await services.getAllEvents();
  res.json(eventsList);
};

const getEventsPagination = async (req, res) => {
  const { skip } = req.query;
  const newsList = await services.getEventsFromDbByPagination(
    Number(skip) || 0
  );
  res.json(newsList);
};

const getEventById = async (req, res) => {
  const { id } = req.query;
  const event = await services.getEventsById(id);
  res.json(event);
};

const searchEventsByTitleAndAuthor = async (req, res) => {
  const { query } = req.query;
  const eventsList = await services.searchEventsByTitleOrAuthor(query);
  res.json(eventsList);
};

const updateEvent = async (req, res) => {
  const { id_event, titulo, author, contenido, finalPathImg } = req.body;

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

  const updatedEvent = await services.updateEventsById(id_event, data);
  res.json(updatedEvent);
};

const deleteevent = async (req, res) => {
  const { id } = req.query;
  const deletedEvent = await services.deletedEvents(id);
  res.json(deletedEvent);
};

const controller = {
  createEvent,
  getAllEvents,
  getEventsPagination,
  getEventById,
  searchEventsByTitleAndAuthor,
  updateEvent,
  deleteevent,
};

module.exports = controller;
