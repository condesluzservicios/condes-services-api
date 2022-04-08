const userSchemas = require('../../security/schemas/user.schema');
const valdiateFormat = require('../../security/helpers/validateFormats');
const services = require('../../services/users/users.services');

const validateFormatLoginUser = async (req, res, next) => {
  try {
    const isValid = await valdiateFormat(userSchemas.userLoginSchema, req.body);

    if (!isValid)
      return res.json({
        msg: 'Data is no correct format',
        success: false,
        data: [],
      });

    next();
  } catch (error) {
    console.log('error to validate format user', error);
    res.json({
      msg: 'error to validate format user',
      success: false,
      data: error,
    });
  }
};

const validateFormatUpdateUserSignin = async (req, res, next) => {
  try {
    const isValid = await valdiateFormat(
      userSchemas.updateUserSchema,
      req.body
    );

    if (!isValid)
      return res.json({
        msg: 'Data is no correct format',
        success: false,
        data: [],
      });

    next();
  } catch (error) {
    console.log('error to validate format user', error);
    res.json({
      msg: 'error to validate format user',
      success: false,
      data: error,
    });
  }
};

const validateExistUser = async (req, res, next) => {
  try {
    const isExist = await services.getUserByEmail(req.body.email);

    if (isExist.data.length)
      return res.json({
        msg: 'Email ya existe',
        success: false,
        data: [],
      });

    next();
  } catch (error) {
    console.log('error to validate exits user', error);
    res.json({
      msg: 'error to validate exits user',
      success: false,
      data: error,
    });
  }
};

const validateDataUser = async (req, res, next) => {
  try {
    if (!req.body.id) {
      return res.json({
        msg: 'Data is no correct format',
        success: false,
        data: [],
      });
    }

    let isValidPassword = {};

    const isValidNameAndLastName =
      await userSchemas.nameAndLastNameSchema.isValid({
        name: req.body.name,
        last_name: req.body.last_name,
      });

    if (!isValidNameAndLastName) {
      return res.json({
        msg: 'Data is no correct format',
        success: false,
        data: [],
      });
    }

    const isValidEmail = await userSchemas.emailSchema.isValid({
      email: req.body.email,
    });

    if (!isValidEmail) {
      return res.json({
        msg: 'Data is no correct format',
        success: false,
        data: [],
      });
    }

    if (req.body.password !== '') {
      await userSchemas.passwordsSchema
        .validate({
          password: req.body.password,
          password_two: req.body.password_two,
        })
        .catch((err) => {
          isValidPassword = {
            name: err.name,
            error: err.errors,
          };
        });
    }

    if (isValidPassword?.name === 'ValidationError') {
      return res.json({
        msg: 'Data is no correct format',
        success: false,
        data: [],
      });
    }

    next();
  } catch (error) {
    console.log('error to validate format user', error);
    res.json({
      msg: 'error to validate format user',
      success: false,
      data: error,
    });
  }
};

const userMiddleware = {
  validateFormatLoginUser,
  validateFormatUpdateUserSignin,
  validateExistUser,
  validateDataUser,
};

module.exports = userMiddleware;
