import { constants } from '../../constants/pagination.constants.js';
import UserModel from '../../Models/users/users.model.js';

/**
 * @param {*} user new user
 * @returns new user saved
 */
export const createNewUserRepository = async (user) => {
  try {
    const newUser = new UserModel(user);
    const userSaved = await newUser.save();
    delete userSaved.password;
    return userSaved;
  } catch (error) {
    console.log(`Error al crear usuario ${error}`);
    return null;
  }
};

/**
 * @param {*} skip
 * @returns users list
 */
export const getUserListRepository = async (skip = 0, id_user) => {
  let results = [];
  skip = skip > 0 ? (skip - 1) * constants.ITEM_PER_PAG : skip;

  try {
    const count = await UserModel.count({ _id: { $ne: id_user } });

    const userList = await UserModel.find({ _id: { $ne: id_user } })
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
      results.push(data);
      data = {};
    });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG);

    const data = {
      pagination: {
        count: count,
        pageCount,
      },
      data: results,
    };

    return data;
  } catch (error) {
    console.log(`Error al obtener usuarios ${error}`);
    return {
      msg: 'Error al obtener usuarios',
      success: false,
      data: error,
    };
  }
};

/**
 * @param {*} id user
 * @returns user data
 */
export const getUsersListByIdRepository = async (id) => {
  let result = [];

  try {
    const dataUser = await UserModel.find({ _id: id });

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

/**
 * @param {*} skip current skip default 0
 * @param {*} role role to search
 * @returns list of users with role
 */
export const getUsersByRoleAndLineSearchRepository = async (
  role,
  line_research,
  skip = 0
) => {
  let results = [];
  skip = skip > 0 ? (skip - 1) * constants.ITEM_PER_PAG : skip;

  try {
    const count = await UserModel.find({ role, line_research }).count();

    const userList = await UserModel.find({ role, line_research })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    userList.forEach((item) => {
      let data = {};
      data.id = item._id;
      data.name = item.name;
      data.last_name = item.last_name;
      data.email = item.email;
      data.line_research = item.line_research;
      data.role = item.role;
      results.push(data);
      data = {};
    });

    const pageCount = Math.ceil(count / constants.ITEM_PER_PAG);

    const data = {
      pagination: {
        count: count,
        pageCount,
      },
      data: results,
    };

    return {
      message: 'lista de usuarios',
      success: true,
      data,
    };
  } catch (error) {
    console.log(`Error al obtener usuarios por rol ${error}`);
    return {
      msg: 'Error to save new user',
      success: false,
      data: error,
    };
  }
};

/**
 * @param {*} email user
 * @returns user data
 */
export const getUserByEmail = async (email) => {
  try {
    const userUpdated = await UserModel.find({ email });
    return userUpdated;
  } catch (error) {
    console.log(`Error al actualizar usuario ${error}`);
  }
};

/**
 * @param {*} id user
 * @returns user data
 */
export const getUserByIdRepository = async (id) => {
  try {
    const user = await UserModel.findOne({ _id: id });

    return user;
  } catch (error) {
    console.log(`error al buscar suario ${error}`);
    return null;
  }
};

/**
 * @param {*} query name or last name of user
 * @returns users list
 */
export const searchUsersByNameAndLastName = async (query) => {
  try {
    let results = [];
    let skip = 1;

    skip = (skip - 1) * constants.ITEM_PER_PAG;

    const usersList = await UserModel.find({
      name: { $regex: '.*' + query + '.*', $options: 'i' },
    })
      .skip(skip)
      .limit(constants.ITEM_PER_PAG)
      .sort({ createdAt: -1 });

    if (usersList.length > 0) {
      results = usersList;
    } else {
      const usersList = await UserModel.find({
        last_name: { $regex: '.*' + query + '.*', $options: 'i' },
      })
        .skip(skip)
        .limit(constants.ITEM_PER_PAG)
        .sort({ createdAt: -1 });

      results = usersList;
    }

    const pageCount = Math.ceil(results.length / constants.ITEM_PER_PAG); // 8 / 6 = 1,3

    const data = {
      pagination: {
        count: results.length,
        pageCount,
      },
      data: results,
    };

    return data;
  } catch (error) {
    console.log(`error al buscar usuarios ${error}`);
  }
};

/**
 * @param {*} user to update
 * @returns user updated
 */
export const updateUserRepository = async (user) => {
  try {
    const userUpdated = await UserModel.findByIdAndUpdate(user.id, user, {
      upsert: true,
    });
    return userUpdated;
  } catch (error) {
    console.log(`Error al actualizar usuario ${error}`);
  }
};
