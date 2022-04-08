const constants = require('../../constants/pagination.constants');
const ModelEvents = require('../../Models/events/events.model');

const saveNewEvent = async (data) => {
  try {
    const newEvent = new ModelEvents(data);
    const savedEvent = await newEvent.save();

    if (savedEvent)
      return {
        msg: 'Evento guardado exitisamente.',
        success: true,
        data: savedEvent,
      };

    return {
      msg: 'Error al guardar evento.',
      success: false,
      data: {},
    };
  } catch (error) {
    console.log('error al guardar eventos ->', error);
    return {
      msg: 'Error al guardar evento.',
      success: false,
      data: error,
    };
  }
};

const getAllEvents = async () => {
  try {
    const eventsList = await ModelEvents.find().skip(0).limit(6);

    if (eventsList)
      return {
        msg: 'Lista de eventos.',
        success: true,
        data: eventsList,
      };

    return {
      msg: 'Error al buscar evento.',
      success: false,
      data: {},
    };
  } catch (error) {
    console.log('error al buscar evento ->', error);
    return {
      msg: 'Error al buscar evento.',
      success: false,
      data: error,
    };
  }
};

const getEventsFromDbByPagination = async (skip = 0) => {
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    const count = await ModelEvents.estimatedDocumentCount();
    const eventsList = await ModelEvents.find()
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: eventsList,
    };

    if (eventsList)
      return {
        msg: 'Lista de eventos',
        success: true,
        data: data,
      };

    return {
      msg: 'Error al buscar eventos',
      success: false,
      data: [],
    };
  } catch (error) {
    console.log('error al obtener eventos ->', error);
    return {
      msg: 'Error al obtener eventos',
      success: false,
      data: error,
    };
  }
};

const getEventsById = async (id) => {
  try {
    const eventsList = await ModelEvents.findById(id);

    if (eventsList)
      return {
        msg: 'Lista de eventos.',
        success: true,
        data: eventsList,
      };

    return {
      msg: 'Error al buscar evento.',
      success: false,
      data: {},
    };
  } catch (error) {
    console.log('error al buscar evento ->', error);
    return {
      msg: 'Error al buscar evento.',
      success: false,
      data: error,
    };
  }
};

const updateEventsById = async (id, data) => {
  try {
    const eventsUpdated = await ModelEvents.findByIdAndUpdate(id, data, {
      upsert: true,
    });

    if (eventsUpdated)
      return {
        msg: 'Evento actualizado exitosamente',
        success: true,
        data: eventsUpdated,
      };

    return {
      msg: 'Error al actualizar evento.',
      success: false,
      data: {},
    };
  } catch (error) {
    console.log('error al actualizar evento ->', error);
    return {
      msg: 'Error al actualizar evento.',
      success: false,
      data: error,
    };
  }
};

const searchEventsByTitleOrAuthor = async (query) => {
  let result = [];
  let skip = 1;
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    // const count = await ModelNews.estimatedDocumentCount();
    const eventsList = await ModelEvents.find({
      title: { $regex: '.*' + query + '.*', $options: 'i' },
    })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    if (eventsList.length > 0) {
      result = eventsList;
    } else {
      const eventsList = await ModelEvents.find({
        author: { $regex: '.*' + query + '.*', $options: 'i' },
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      result = eventsList;
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
      msg: 'Lista de eventos.',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener eventos ->', error);
    return {
      msg: 'Error al obtener eventos',
      success: false,
      data: error,
    };
  }
};

const deletedEvents = async (id) => {
  try {
    const deletedEvent = await ModelEvents.findByIdAndDelete({ _id: id });

    if (deletedEvent)
      return {
        msg: 'Evento actualizado exitosamente',
        success: true,
        data: deletedEvent,
      };

    return {
      msg: 'Error al actualizar evento.',
      success: false,
      data: {},
    };
  } catch (error) {
    console.log('error al actualizar evento ->', error);
    return {
      msg: 'Error al actualizar evento.',
      success: false,
      data: error,
    };
  }
};

const services = {
  saveNewEvent,
  getAllEvents,
  getEventsFromDbByPagination,
  getEventsById,
  searchEventsByTitleOrAuthor,
  updateEventsById,
  deletedEvents,
};

module.exports = services;
