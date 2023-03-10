import * as services from '../../services/events/events.services.js';

export const createEvent = async (req, res) => {
  const createdEvent = await services.saveNewEvent(req.body);
  res.json(createdEvent);
};

export const getAllEvents = async (req, res) => {
  const eventsList = await services.getAllEvents();
  res.json(eventsList);
};

export const getEventsPagination = async (req, res) => {
  const { skip } = req.query;
  const newsList = await services.getEventsFromDbByPagination(
    Number(skip) || 0
  );
  res.json(newsList);
};

export const getEventById = async (req, res) => {
  const { id } = req.query;
  const event = await services.getEventsById(id);
  res.json(event);
};

export const searchEventsByTitleAndAuthor = async (req, res) => {
  const { query } = req.query;
  const eventsList = await services.searchEventsByTitleOrAuthor(query);
  res.json(eventsList);
};

export const updateEvent = async (req, res) => {
  const updatedEvent = await services.updateEventsById(req.body);
  res.json(updatedEvent);
};

export const deleteevent = async (req, res) => {
  const { id } = req.query;
  const deletedEvent = await services.deletedEvents(id);
  res.json(deletedEvent);
};
