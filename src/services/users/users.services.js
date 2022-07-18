const constants = require('../../constants/pagination.constants');
const ModelUsers = require('../../Models/users/users.model');
const { createHash } = require('../../security/users/passwords');
const handlePasswords = require('../../security/users/passwords');

const SaveNewUser = async (data) => {
  try {
    const newPassword = await handlePasswords.createHash(data.password);
    data.password = newPassword;

    const newUser = new ModelUsers(data);
    const userSaved = await newUser.save();
    return {
      msg: 'New user saved',
      success: true,
      data: { userID: userSaved._id, date: userSaved.createdAt },
    };
  } catch (error) {
    console.log('err to save new user', error);
    return {
      msg: 'Error to save new user',
      success: false,
      data: error,
    };
  }
};

const updateUserSignin = async (data) => {
  try {
    const userUpdated = await ModelUsers.findByIdAndUpdate(data.id, data, {
      upsert: true,
    });
    return {
      msg: 'New user updated',
      success: true,
      data: { userID: userUpdated._id, date: userUpdated.createdAt },
    };
  } catch (error) {
    console.log('err to update new user', error);
    return {
      msg: 'Error to update new user',
      success: false,
      data: error,
    };
  }
};

const getDataUser = async (email) => {
  const result = [];
  try {
    const user = await ModelUsers.find(email);

    return {
      msg: 'Datos del usuario.',
      success: true,
      data: user,
    };
  } catch (error) {
    console.log('error al obtener datos del usuario.', error);
    return {
      msg: 'Error al obtener datos del usuario.',
      success: false,
      data: error,
    };
  }
};

const getUserList = async (skip = 0) => {
  let result = [];

  skip = (skip - 1) * constants.ITEM_PER_PAG;

  try {
    const count = await ModelUsers.estimatedDocumentCount();

    const userList = await ModelUsers.find()
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    userList.forEach((item) => {
      let data = {};
      data.id = item._id;
      data.name = item.name;
      data.last_name = item.last_name;
      data.email = item.email;
      data.investigations = data?.investigations
        ? data.investigations
        : 'No hay investigaciones';
      result.push(data);
      data = {};
    });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG);

    const data = {
      pagination: {
        count,
        pageCount,
      },
      data: result,
    };

    return {
      msg: 'Datos del usuario.',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener lista de usuarios.', error);
    return {
      msg: 'Error al obtener lista de usuarios.',
      success: false,
      data: error,
    };
  }
};

const updateDataUser = async (data) => {
  try {
    const newPassword = await createHash(data.password);
    data.password = newPassword;

    const userUpdated = await ModelUsers.findByIdAndUpdate(data.id, data, {
      upsert: true,
    });
    return {
      msg: 'Datos actualizados.',
      success: true,
      data: userUpdated,
    };
  } catch (error) {
    console.log('error al actualizar datos.', error);
    return {
      msg: 'Error al actualizar datos.',
      success: false,
      data: error,
    };
  }
};

const updateDataUserFromAdmin = async (data) => {
  try {
    const userUpdated = await ModelUsers.findByIdAndUpdate(data.id, data, {
      upsert: true,
    });
    return {
      msg: 'Datos actualizados.',
      success: true,
      data: userUpdated,
    };
  } catch (error) {
    console.log('error al actualizar datos.', error);
    return {
      msg: 'Error al actualizar datos.',
      success: false,
      data: error,
    };
  }
};

const getUserByEmail = async (email) => {
  try {
    const userFinded = await ModelUsers.find({ email });
    return {
      msg: 'User',
      success: true,
      data: userFinded,
    };
  } catch (error) {
    console.log('Error to get user', error);
    return {
      msg: 'Error to get user',
      success: false,
      data: error,
    };
  }
};

const getUserByID = async (id) => {
  let result = [];

  try {
    const dataUser = await ModelUsers.find({ _id: id });

    dataUser.forEach((item) => {
      let data = {};
      data.id = item._id;
      data.name = item.name;
      data.last_name = item.last_name;
      data.email = item.email;
      data.investigations = data?.investigations
        ? data.investigations
        : 'No hay investigaciones';
      data.role = item.role;
      data.country = item.country;
      data.cod_number = item.cod_number;
      data.phone = item.phone;
      data.isCompany = item.isCompany;
      result.push(data);
      data = {};
    });

    return {
      msg: 'Datos del usuario',
      success: true,
      data: result,
    };
  } catch (error) {
    console.log('error al buscar usuario', error);
    return {
      msg: 'Error al buscar usuario',
      success: false,
      data: [],
    };
  }
};

const searchUsersByNameOrLastName = async (query) => {
  let result = [];
  let skip = 1;
  try {
    skip = (skip - 1) * constants.ITEM_PER_PAG;

    // const count = await ModelNews.estimatedDocumentCount();
    const usersList = await ModelUsers.find({
      name: { $regex: '.*' + query + '.*', $options: 'i' },
    })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    if (usersList.length > 0) {
      result = usersList;
    } else {
      const usersList = await ModelUsers.find({
        last_name: { $regex: '.*' + query + '.*', $options: 'i' },
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      result = usersList;
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
      msg: 'Lista de usuarios.',
      success: true,
      data: data,
    };
  } catch (error) {
    console.log('error al obtener usuarios ->', error);
    return {
      msg: 'Error al obtener usuarios',
      success: false,
      data: error,
    };
  }
};

const services = {
  SaveNewUser,
  updateUserSignin,
  updateDataUser,
  updateDataUserFromAdmin,
  getDataUser,
  getUserList,
  getUserByEmail,
  getUserByID,
  searchUsersByNameOrLastName,
};

module.exports = services;
