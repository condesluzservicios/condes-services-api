import yup from 'yup';
import * as userSchemas from '../../security/schemas/user.schema.js';
import * as projectsSchemas from '../../security/schemas/projects/projects.schemas.js';
import validateFormats from '../../security/helpers/validateFormats.js';
import * as services from '../../services/users/users.services.js';

export const validateFormatLoginUser = async (req, res, next) => {
  try {
    const isValid = await validateFormats(
      userSchemas.userLoginSchema,
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

export const validateFormatUpdateUserSignin = async (req, res, next) => {
  try {
    const isValid = await validateFormats(
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

export const validateExistUser = async (req, res, next) => {
  try {
    const isExist = await services.getUserByEmail(req.body.email);

    if (isExist.data.length > 0)
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

export const validateDataUser = async (req, res, next) => {
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

    if (isValidPassword.name === 'ValidationError') {
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

export const validateDataProjectStepOne = async (req, res, next) => {
  const body = req.body;

  try {
    const isValid = await validateFormats(
      projectsSchemas.registerProjectsStepOneSchema,
      body
    );

    if (!isValid)
      return res.json({
        msg: 'Data is no correct format',
        success: false,
        data: [],
      });

    next();
  } catch (error) {
    console.log('error to validate format new project', error);
    res.json({
      msg: 'error to validate format new project',
      success: false,
      data: error,
    });
  }
};

export const validateDataProjectBySteps = async (req, res, next) => {
  try {
    const { flag } = req.query;

    let isValid = false;

    switch (flag) {
      case 'stepTwo': {
        isValid = await validateFormats(
          projectsSchemas.registerProjectsStepTwoSchema,
          req.body
        );

        projectsSchemas.registerProjectsStepTwoSchema
          .validate(req.body)
          .catch(function (err) {
            console.log('v ----------->', err.name, err.errors);
          });

        break;
      }

      case 'stepThree': {
        isValid = await validateFormats(
          projectsSchemas.registerProjectsStepThreeSchema,
          req.body
        );

        projectsSchemas.registerProjectsStepThreeSchema
          .validate(req.body)
          .catch(function (err) {
            console.log('v ----------->', err.name, err.errors);
          });

        if (!req.body.chronogram_activities) {
          isValid = null;
          console.log(
            'error ----------->',
            'debe ingresar un cronograma de actividades.'
          );
        }

        break;
      }

      case 'stepFour': {
        // * validacion de arreglo

        const validateArrSchema = yup
          .array()
          .of(projectsSchemas.projectParticipantsSchema);

        isValid = await validateFormats(
          validateArrSchema,
          req.body.membersList
        );

        break;
      }

      case 'stepFive': {
        isValid = true;
        break;
      }

      default: {
        isValid = false;
        break;
      }
    }

    if (!isValid)
      return res.json({
        msg: 'Datos no cumplen con un formato valido.',
        success: false,
        data: [],
      });

    next();
  } catch (error) {
    console.log('error to validate format new project', error);
    res.json({
      msg: 'error to validate format new project',
      success: false,
      data: error,
    });
  }
};
