const ModelNews = require('../../Models/news/news.model');
const constants = require('../../constants/pagination.constants');

const saveNews = async (data) => {
  try {
    const currentNew = new ModelNews(data);
    const newSaved = await currentNew.save();

    if (newSaved)
      return {
        msg: 'Noticia guardada exitosamente',
        success: true,
        data: newSaved,
      };

    return {
      msg: 'Error al guardar noticia',
      success: false,
      data: [],
    };
  } catch (error) {
    console.log('error al guardar nueva noticia ->', error);
    return {
      msg: 'Error al guardar noticia',
      success: false,
      data: error,
    };
  }
};

const getAllNews = async () => {
  try {
    const newsList = await ModelNews.find();

    if (newsList)
      return {
        msg: 'Lista de noticias',
        success: true,
        data: newsList,
      };

    return {
      msg: 'Error al buscar noticias',
      success: false,
      data: [],
    };
  } catch (error) {
    console.log('error al obtener noticias ->', error);
    return {
      msg: 'Error al obtener noticias',
      success: false,
      data: error,
    };
  }
};

const getNewsFromDbByPagination = async (skip = 0) => {
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    const count = await ModelNews.estimatedDocumentCount();
    const newsList = await ModelNews.find()
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: newsList,
    };

    return {
      msg: 'Lista de noticias',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener noticias ->', error);
    return {
      msg: 'Error al obtener noticias',
      success: false,
      data: error,
    };
  }
};

const getNewsById = async (id) => {
  try {
    const news = await ModelNews.findById(id);

    if (news)
      return {
        msg: 'Lista de noticia',
        success: true,
        data: news,
      };

    return {
      msg: 'Error al buscar noticia',
      success: false,
      data: [],
    };
  } catch (error) {
    console.log('error al obtener noticia ->', error);
    return {
      msg: 'Error al obtener noticia',
      success: false,
      data: error,
    };
  }
};

const updateNewsById = async (id, data) => {
  try {
    const newsUpdated = await ModelNews.findByIdAndUpdate(id, data, {
      upsert: true,
    });
    return {
      msg: 'Noticia actualizada exitosamente.',
      success: true,
      data: newsUpdated,
    };
  } catch (error) {
    console.log('error al actualizar noticia', error);
    return {
      msg: 'error al actualizar noticia',
      success: false,
      data: error,
    };
  }
};

const deleteNewsById = async (id) => {
  try {
    const newsDeleted = await ModelNews.findByIdAndDelete({ _id: id });
    return {
      msg: 'Noticia eliminada exitosamente.',
      success: true,
      data: newsDeleted,
    };
  } catch (error) {
    console.log('error al eliminada noticia', error);
    return {
      msg: 'error al eliminada noticia',
      success: false,
      data: error,
    };
  }
};

const searchNewsByTitleOrAuthor = async (query) => {
  let result = [];
  let skip = 1;
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    // const count = await ModelNews.estimatedDocumentCount();
    const newsList = await ModelNews.find({
      title: { $regex: '.*' + query + '.*', $options: 'i' },
    })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    if (newsList.length > 0) {
      result = newsList;
    } else {
      const newsList = await ModelNews.find({
        author: { $regex: '.*' + query + '.*', $options: 'i' },
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      result = newsList;
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
      msg: 'Lista de noticias.',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener noticias ->', error);
    return {
      msg: 'Error al obtener noticias',
      success: false,
      data: error,
    };
  }
};

const services = {
  saveNews,
  getAllNews,
  getNewsFromDbByPagination,
  getNewsById,
  searchNewsByTitleOrAuthor,
  updateNewsById,
  deleteNewsById,
};

module.exports = services;
