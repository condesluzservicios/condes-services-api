import * as userRepository from '../../repositories/users.repositories/users.repository.js';
import { createHash } from '../../security/users/passwords.js';

export const SaveNewUser = async (data) => {
  try {
    const newPassword = await createHash(data.password);
    data.password = newPassword;

    const userSaved = await userRepository.createNewUserRepository(data);
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

export const updateUserSignin = async (data) => {
  try {
    const userUpdated = await userRepository.updateUserRepository(data);
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

export const getDataUser = async (email) => {
  try {
    const user = await userRepository.getUserByEmail(email);

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

export const getUserList = async (skip = 0, id_user) => {
  try {
    const result = await userRepository.getUserListRepository(skip, id_user);

    return {
      msg: 'Datos del usuario.',
      success: true,
      data: result,
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

export const updateDataUser = async (data) => {
  try {
    const newPassword = await createHash(data.password);
    data.password = newPassword;

    const userUpdated = await userRepository.updateUserRepository(data);
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

export const updateDataUserFromAdmin = async (data) => {
  try {
    const userUpdated = await userRepository.updateUserRepository(data);
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

export const getUserByEmail = async (email) => {
  try {
    const userFounded = await userRepository.getUserByEmail(email);
    return {
      msg: 'User',
      success: true,
      data: userFounded,
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

export const getUserByID = async (id) =>
  await userRepository.getUsersListByIdRepository(id);

export const searchUsersByNameOrLastName = async (query) => {
  try {
    const data = await userRepository.searchUsersByNameAndLastName(query);

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
