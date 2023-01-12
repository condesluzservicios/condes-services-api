import * as auth from '../../security/helpers/tokens.js';
import * as handlePasswords from '../../security/users/passwords.js';
import * as services from '../../services/users/users.services.js';

export const signIn = async (req, res) => {
  const userSaved = await services.SaveNewUser(req.body);
  res.json(userSaved);
};

export const updateUserSignin = async (req, res) => {
  const userUpdated = await services.updateUserSignin(req.body);
  res.json(userUpdated);
};

export const login = async (req, res) => {
  try {
    const user = await services.getUserByEmail(req.body.email);

    if (user) {
      const isValidPassword = await handlePasswords.comparePasswords(
        req.body.password,
        user.data[0].password
      );

      if (!isValidPassword) {
        return res.json({
          msg: 'Error en correo o contraseña',
          success: false,
          data: [],
        });
      }

      const token = await auth.generateToken(user.data[0]._id);

      res.json({
        msg: 'success',
        success: true,
        data: {
          id: user.data[0]._id,
          email: user.data[0].email,
          name: user.data[0].name,
          last_name: user.data[0].last_name,
          role: user.data[0].role,
          token,
        },
      });
    } else {
      res.json({
        msg: 'Error en correo o contraseña.',
        success: false,
        data: [],
      });
    }
  } catch (error) {
    console.log('error al iniciar sesion ->', error);
    res.json({
      msg: 'Error en correo o contraseña.',
      success: false,
      data: [],
    });
  }
};

export const updateDataUser = async (req, res) => {
  const userUpdated = await services.updateDataUser(req.body);
  res.json(userUpdated);
};

export const updateDataUserFromAdmin = async (req, res) => {
  const userUpdated = await services.updateDataUserFromAdmin(req.body);
  res.json(userUpdated);
};

export const getDataUser = async (req, res) => {
  const { id } = req.query;
  let result = {};
  let user = await services.getUserByEmail(id);
  user.data.forEach((element) => {
    result.id = element._id;
    result.name = element.name;
    result.last_name = element.last_name;
    result.email = element.email;
    result.cod_number = element?.cod_number ? element?.cod_number : '+';
    result.phone = element?.phone ? element?.phone : '';
    result.isCompany = element.isCompany;
  });

  user.data = result;
  res.json(user);
};

export const getUserByID = async (req, res) => {
  const { id } = req.query;
  const userData = await services.getUserByID(id);
  res.json(userData);
};

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  const usersList = await services.searchUsersByNameOrLastName(query);
  res.json(usersList);
};

export const getAllUser = async (req, res) => {
  const { skip } = req.query;
  const userList = await services.getUserList(Number(skip) || 0);
  res.json(userList);
};
